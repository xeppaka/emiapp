package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductDeleted extends EmiEvent {
    private final UUID productId;

    @JsonCreator
    public ProductDeleted(@JsonProperty("productId") UUID productId) {
        super(EmiEventType.PRODUCT_DELETED);

        Validate.notNull(productId);
        this.productId = productId;
    }

    public UUID getProductId() {
        return productId;
    }
}
