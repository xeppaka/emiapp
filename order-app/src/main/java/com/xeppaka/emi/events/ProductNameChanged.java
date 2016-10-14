package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class ProductNameChanged extends EmiEvent {
    private final UUID productId;
    private final String newName;

    public ProductNameChanged(UUID aggregateId, UUID productId, String newName) {
        super(aggregateId, EmiEventType.PRODUCT_NAME_CHANGED);
        Validate.notNull(productId);
        Validate.notNull(newName);

        this.productId = productId;
        this.newName = newName;
    }

    public UUID getProductId() {
        return productId;
    }

    public String getNewName() {
        return newName;
    }
}
