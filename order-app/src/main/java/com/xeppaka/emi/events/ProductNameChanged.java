package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 */
public class ProductNameChanged extends EmiEvent {
    private final UUID productId;
    private final String name;

    @JsonCreator
    public ProductNameChanged(@JsonProperty("productId") UUID productId,
                              @JsonProperty("name") String name) {
        super(EmiEventType.PRODUCT_NAME_CHANGED);
        Validate.notNull(productId);
        Validate.notNull(name);

        this.productId = productId;
        this.name = name;
    }

    public UUID getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }
}
