package com.xeppaka.emi.commands;

import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.ddd.persistence.RepositoryException;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.persistence.EmiWarehouseRepository;
import org.apache.commons.lang3.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * Created by nnm on 10/13/16.
 */
@Component
public class EmiCommandHandler {
    private static final Logger log = LoggerFactory.getLogger(EmiCommandHandler.class);

    @Autowired
    private EmiWarehouseRepository emiWarehouseRepository;

    public <T extends EmiCommand> void handle(T command) throws CommandHandleException {
        Validate.notNull(command);

        final EmiWarehouse emiWarehouse = emiWarehouseRepository.find(EmiWarehouse.AGGREGATE_ID);
        emiWarehouse.handle(command);

        try {
            emiWarehouseRepository.save(command.getUserNameStr(), emiWarehouse);
        } catch (RepositoryException e) {
            log.error("Error occurred while handling command.", e);
            throw new CommandHandleException("Error occurred while handling command.", e);
        }
    }
}
