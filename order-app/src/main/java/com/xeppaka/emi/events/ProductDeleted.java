package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class ProductDeleted extends EmiEvent {
    private UUID id;

    public ProductDeleted(UUID id) {
        super(EmiEventType.PRODUCT_DELETED);

        Validate.notNull(id);
        this.id = id;
    }

    public UUID getId() {
        return id;
    }
}
