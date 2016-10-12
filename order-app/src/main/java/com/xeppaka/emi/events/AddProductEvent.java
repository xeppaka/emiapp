package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

/**
 * Created by Pavel K. on 10/11/16.
 */
public class AddProductEvent extends EmiEvent {
    private String productName;
    private double price;

    public AddProductEvent(String productName, double price) {
        super(EmiEventType.ADD_PRODUCT);
        Validate.notNull(productName);
        Validate.inclusiveBetween(0, Double.MAX_VALUE, price);

        this.productName = productName;
        this.price = price;
    }

    public String getProductName() {
        return productName;
    }

    public double getPrice() {
        return price;
    }
}
