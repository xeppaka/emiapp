package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class ProductRemoved extends EmiEvent {
    private final UUID productId;

    private ProductRemoved() {
        super(EmiEventType.PRODUCT_REMOVED);
        productId = null;
    }

    public ProductRemoved(UUID productId) {
        super(EmiEventType.PRODUCT_REMOVED);

        Validate.notNull(productId);
        this.productId = productId;
    }

    public UUID getProductId() {
        return productId;
    }
}
