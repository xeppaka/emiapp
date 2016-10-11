package com.xeppaka.emi.dto;

import com.xeppaka.emi.domain.Country;
import com.xeppaka.emi.domain.order.Order;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * Created by Pavel K. on 10/3/16.
 */
public class OrderDto {
    private String email;
    private String country;
    private Collection<ProductDto> products;

    private OrderDto() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Collection<ProductDto> getProducts() {
        return products;
    }

    public void setProducts(Collection<ProductDto> products) {
        this.products = products;
    }

    public Order toOrder() {
        return new Order(email, Country.valueOf(country), products.stream().map(ProductDto::toProduct).collect(Collectors.toList()));
    }
}
