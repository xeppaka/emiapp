package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class ProductNameChanged extends EmiEvent {
    private final UUID productId;
    private final String newName;

    private ProductNameChanged() {
        super(EmiEventType.PRODUCT_NAME_CHANGED);

        productId = null;
        newName = null;
    }

    public ProductNameChanged(UUID productId, String newName) {
        super(EmiEventType.PRODUCT_NAME_CHANGED);
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
