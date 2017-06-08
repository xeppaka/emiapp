package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class ProductPriceChanged extends EmiEvent {
    private final UUID productId;
    private final int price;

    @JsonCreator
    public ProductPriceChanged(@JsonProperty("productId") UUID productId,
                               @JsonProperty("price") int price) {
        super(EmiEventType.PRODUCT_PRICE_CHANGED);

        this.productId = productId;
        this.price = price;
    }

    public UUID getProductId() {
        return productId;
    }

    public int getPrice() {
        return price;
    }
}
