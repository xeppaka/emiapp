package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class ProductNameChanged extends EmiEvent {
    private UUID id;
    private String newName;

    public ProductNameChanged(UUID id, String newName) {
        super(EmiEventType.PRODUCT_NAME_CHANGED);

        Validate.notNull(id);
        Validate.notNull(newName);

        this.id = id;
        this.newName = newName;
    }

    public UUID getId() {
        return id;
    }

    public String getNewName() {
        return newName;
    }
}
