package com.xeppaka.emi.entities;

import com.xeppaka.ddd.domain.Entity;
import org.apache.commons.lang3.Validate;

import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

/**
 *
 */
public class Product extends Entity {
    private String name;
    private double price;
    private String note;
    private Category category;
    private Set<ProductFeature> productFeatures = EnumSet.noneOf(ProductFeature.class);

    public Product(UUID id, String name, double price, String note, Category category, Set<ProductFeature> productFeatures) {
        super(id);

        Validate.notNull(name);
        Validate.inclusiveBetween(0, Double.MAX_VALUE, price);
        Validate.notNull(productFeatures);

        this.name = name;
        this.price = price;
        this.note = note;
        this.category = category;
        this.productFeatures.addAll(productFeatures);
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getNote() {
        return note;
    }

    public Category getCategory() {
        return category;
    }

    public Set<ProductFeature> getFeatures() {
        return productFeatures;
    }

    public void addFeature(ProductFeature feature) {
        Validate.notNull(feature);

        productFeatures.add(feature);
    }
}
