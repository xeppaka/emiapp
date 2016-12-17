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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductDto that = (ProductDto) o;

        if (price != that.price) return false;
        if (multiplicity != that.multiplicity) return false;
        if (weight != that.weight) return false;
        if (!productId.equals(that.productId)) return false;
        if (!name.equals(that.name)) return false;
        if (!note.equals(that.note)) return false;
        if (!categoryId.equals(that.categoryId)) return false;
        return features.equals(that.features);
    }

    @Override
    public int hashCode() {
        int result = productId.hashCode();
        result = 31 * result + name.hashCode();
        result = 31 * result + price;
        result = 31 * result + multiplicity;
        result = 31 * result + note.hashCode();
        result = 31 * result + categoryId.hashCode();
        result = 31 * result + features.hashCode();
        result = 31 * result + weight;
        return result;
    }
}
