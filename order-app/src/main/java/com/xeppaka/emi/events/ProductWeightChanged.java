package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

/**
 * Created by nnm on 11/20/16.
 */
public class ProductWeightChanged extends EmiEvent {
    private final UUID productId;
    private final int weight;

    @JsonCreator
    public ProductWeightChanged(@JsonProperty("productId") UUID productId,
                                @JsonProperty("weight") int weight) {
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
