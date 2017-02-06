package com.xeppaka.emi.domain.order;

import java.util.UUID;

import org.apache.commons.lang3.Validate;

/**
 * Created by nnm on 1/19/17.
 */
public class OrderProduct {
    private final UUID productId;
    private final int count;

    public OrderProduct(UUID productId, int count) {
        Validate.notNull(productId);
        Validate.inclusiveBetween(1, Integer.MAX_VALUE, count);

        this.productId = productId;
        this.count = count;
    }

    public UUID getProductId() {
        return productId;
    }

    public int getCount() {
        return count;
    }
}
