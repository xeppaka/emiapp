package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class ProductRemoved extends EmiEvent {
    private final UUID productId;

    public ProductRemoved(UUID aggregateId, UUID productId) {
        super(aggregateId, EmiEventType.PRODUCT_REMOVED);

        Validate.notNull(productId);
        this.productId = productId;
    }

    public UUID getProductId() {
        return productId;
    }
}
