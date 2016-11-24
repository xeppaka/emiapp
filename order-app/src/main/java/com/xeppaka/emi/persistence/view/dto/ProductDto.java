package com.xeppaka.emi.persistence.view.dto;

import com.xeppaka.emi.domain.ProductFeature;

import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

/**
 * Created by nnm on 10/18/16.
 */
public class ProductDto {
    private final UUID productId;
    private final String name;
    private final int price;
    private final int multiplicity;
    private final String note;
    private final UUID categoryId;
    private final Set<ProductFeature> productFeatures = EnumSet.noneOf(ProductFeature.class);
    private final int weight;

    private ProductDto() {
        this.productId = null;
        this.name = null;
        this.price = 0;
        this.multiplicity = 0;
        this.note = null;
        this.categoryId = null;
        this.weight = 0;
    }

    public ProductDto(UUID productId, String name, int price, int multiplicity, String note, Set<ProductFeature> productFeatures, UUID categoryId, int weight) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.multiplicity = multiplicity;
        this.note = note;
        this.productFeatures.addAll(productFeatures);
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

    public Set<ProductFeature> getProductFeatures() {
        return productFeatures;
    }

    public int getWeight() {
        return weight;
    }
}
