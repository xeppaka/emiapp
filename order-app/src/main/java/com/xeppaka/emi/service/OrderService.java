/*
 * Copyright (C) 2007-2017, GoodData(R) Corporation. All rights reserved.
 */
package com.xeppaka.emi.service;

import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.emi.commands.EmiCommandHandler;
import com.xeppaka.emi.commands.SendOrderCommand;
import com.xeppaka.emi.domain.Country;
import com.xeppaka.emi.domain.value.UserName;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

/**
 * TODO: document it!
 */
@Service
public class OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);
    private final EmiCommandHandler emiCommandHandler;

    public OrderService(EmiCommandHandler emiCommandHandler) {
        this.emiCommandHandler = emiCommandHandler;
    }

    public void sendOrder(String email, Country country, Map<UUID, Integer> productsQuantity) throws EmiWarehouseException {
        try {
            final SendOrderCommand sendOrderCommand = new SendOrderCommand(email, country, productsQuantity);
            emiCommandHandler.handle(UserName.SYSTEM_USER_NAME, sendOrderCommand);
        } catch (CommandHandleException e) {
            log.error("Error while handling command.", e);
            throw new EmiWarehouseException("Error occurred while sending order.", e);
        }
    }
}
