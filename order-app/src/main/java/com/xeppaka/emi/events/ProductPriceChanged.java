package com.xeppaka.emi.events;

import java.util.UUID;

/**
 * Created by nnm on 11/20/16.
 */
public class ProductPriceChanged extends EmiEvent {
    private final UUID productId;
    private final int newPrice;

    private ProductPriceChanged(EmiEventType eventType) {
        super(EmiEventType.PRODUCT_PRICE_CHANGED);

        productId = null;
        newPrice = 0;
    }

    public ProductPriceChanged(UUID productId, int newPrice) {
        super(EmiEventType.PRODUCT_PRICE_CHANGED);

        this.productId = productId;
        this.newPrice = newPrice;
    }

    public UUID getProductId() {
        return productId;
    }

    public int getNewPrice() {
        return newPrice;
    }
}
