package com.xeppaka.emi.persistence.dto;

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
    private final boolean visible;

    private ProductDto() {
        productId = null;
        name = null;
        price = 0;
        multiplicity = 0;
        note = null;
        categoryId = null;
        visible = false;
    }

    public ProductDto(UUID productId, String name, int price, int multiplicity, String note, Set<ProductFeature> productFeatures, UUID categoryId, boolean visible) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.multiplicity = multiplicity;
        this.note = note;
        this.productFeatures.addAll(productFeatures);
        this.categoryId = categoryId;
        this.visible = visible;
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

    public boolean isVisible() {
        return visible;
    }
}
