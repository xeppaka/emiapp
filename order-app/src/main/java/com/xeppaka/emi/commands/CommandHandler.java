package com.xeppaka.emi.commands;

import com.xeppaka.emi.persistence.EmiWarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.UUID;

/**
 * Created by nnm on 10/13/16.
 */
@Component
public class CommandHandler {
    @Autowired
    private EmiWarehouseRepository emiWarehouseRepository;

    public void handle(AddProductCommand command) {
        emiWarehouseRepository.find(UUID.randomUUID());
    }
}
