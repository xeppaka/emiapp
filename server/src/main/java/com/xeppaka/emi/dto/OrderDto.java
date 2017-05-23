package com.xeppaka.emi.dto;

import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class OrderDto {
    private final String email;
    private final String country;
    private final Collection<OrderProductDto> products;

    @JsonCreator
    public OrderDto(@JsonProperty("email") String email,
                    @JsonProperty("country") String country,
                    @JsonProperty("products") Collection<OrderProductDto> products) {
        this.email = email;
        this.country = country;
        this.products = products;
    }

    public String getEmail() {
        return email;
    }

    public String getCountry() {
        return country;
    }

    public Collection<OrderProductDto> getProducts() {
        return products;
    }
}
