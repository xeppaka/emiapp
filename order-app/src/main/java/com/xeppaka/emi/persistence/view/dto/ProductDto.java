package com.xeppaka.emi.persistence.view.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.xeppaka.emi.domain.ProductFeature;

import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

public class ProductDto {
    private final UUID productId;
    private final String name;
    private final int price;
    private final int multiplicity;
    private final String note;
    private final UUID categoryId;
    private final Set<ProductFeature> features = EnumSet.noneOf(ProductFeature.class);
    private final int weight;

    @JsonCreator
    public ProductDto(@JsonProperty("productId") UUID productId,
                      @JsonProperty("name") String name,
                      @JsonProperty("price") int price,
                      @JsonProperty("multiplicity") int multiplicity,
                      @JsonProperty("note") String note,
                      @JsonProperty("features") Set<ProductFeature> features,
                      @JsonProperty("categoryId") UUID categoryId,
                      @JsonProperty("weight") int weight) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.multiplicity = multiplicity;
        this.note = note;
        this.features.addAll(features);
        this.categoryId = categoryId;
        this.weight = weight;
    }

    public UUID getProductId() {
        return productId;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public int getMultiplicity() {
        return multiplicity;
    }

    public String getNote() {
        return note;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public Set<ProductFeature> getFeatures() {
        return features;
    }

    public int getWeight() {
        return weight;
    }
}
