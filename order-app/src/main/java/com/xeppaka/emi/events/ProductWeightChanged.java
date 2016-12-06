package com.xeppaka.emi.events;

import java.util.UUID;

/**
 * Created by nnm on 11/20/16.
 */
public class ProductWeightChanged extends EmiEvent {
    private final UUID productId;
    private final int weight;

    private ProductWeightChanged() {
        super(EmiEventType.PRODUCT_WEIGHT_CHANGED);

        productId = null;
        weight = 0;
    }

    public ProductWeightChanged(UUID productId, int weight) {
        super(EmiEventType.PRODUCT_WEIGHT_CHANGED);

        this.productId = productId;
        this.weight = weight;
    }

    public UUID getProductId() {
        return productId;
    }

    public int getWeight() {
        return weight;
    }
}
