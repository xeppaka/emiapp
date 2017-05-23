package com.xeppaka.emi.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class OrderProductDto {
    private final UUID productId;
    private final int quantity;

    @JsonCreator
    public OrderProductDto(@JsonProperty("productId") UUID productId,
                           @JsonProperty("quantity") int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public UUID getProductId() {
        return productId;
    }

    public int getQuantity() {
        return quantity;
    }
}
