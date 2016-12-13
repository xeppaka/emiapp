package com.xeppaka.emi.events;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

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
