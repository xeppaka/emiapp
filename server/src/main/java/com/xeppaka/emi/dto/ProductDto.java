package com.xeppaka.emi.dto;

import com.xeppaka.emi.domain.order.Product;
import com.xeppaka.emi.domain.ProductFeature;

/**
 * Created by Pavel K. on 10/3/16.
 */
public class ProductDto {
    private String type;
    private String name;
    private double price;
    private int quantity;

    private ProductDto() {}

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

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
        return new Product(ProductFeature.valueOf(type), name, price, quantity);
    }
}
