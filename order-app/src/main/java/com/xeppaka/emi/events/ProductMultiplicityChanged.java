package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class ProductMultiplicityChanged extends EmiEvent {
    private final UUID productId;
    private final int multiplicity;

    @JsonCreator
    public ProductMultiplicityChanged(@JsonProperty("productId") UUID productId,
                                      @JsonProperty("multiplicity") int multiplicity) {
        super(EmiEventType.PRODUCT_MULTIPLICITY_CHANGED);

        this.productId = productId;
        this.multiplicity = multiplicity;
    }

    public UUID getProductId() {
        return productId;
    }

    public int getMultiplicity() {
        return multiplicity;
    }
}
