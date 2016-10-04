package com.xeppaka.emi.dto;

import com.xeppaka.emi.entities.Product;

/**
 * Created by Pavel K. on 10/3/16.
 */
public class ProductDto {
    private String name;
    private double price;
    private int quantity;

    private ProductDto() {}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Product toProduct() {
        return new Product(name, price, quantity);
    }
}
