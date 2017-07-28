package com.xeppaka.emi.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Collection;

public class UiOrderDto {
    private final String email;
    private final String country;
    private final Collection<UiOrderProductDto> products;

    @JsonCreator
    public UiOrderDto(@JsonProperty("email") String email,
                      @JsonProperty("country") String country,
                      @JsonProperty("products") Collection<UiOrderProductDto> products) {
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

    public Collection<UiOrderProductDto> getProducts() {
        return products;
    }
}
