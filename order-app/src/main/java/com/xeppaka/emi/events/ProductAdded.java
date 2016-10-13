package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class ProductAdded extends EmiEvent {
    private UUID id;
    private String productName;
    private double price;

    public ProductAdded(UUID id, String productName, double price) {
        super(EmiEventType.PRODUCT_ADDED);
        Validate.notNull(id);
        Validate.notNull(productName);
        Validate.inclusiveBetween(0, Double.MAX_VALUE, price);

        this.id = id;
        this.productName = productName;
        this.price = price;
    }

    public UUID getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public double getPrice() {
        return price;
    }
}
