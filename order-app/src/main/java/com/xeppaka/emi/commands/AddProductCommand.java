package com.xeppaka.emi.commands;

import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.domain.entities.Category;
import org.apache.commons.lang3.Validate;

import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

/**
 *
 */
public class AddProductCommand {
    private UUID productId;
    private String name;
    private double price;
    private String note;
    private Category category;
    private Set<ProductFeature> features;

    public AddProductCommand(UUID productId, String name, double price, String note, Category category, Collection<ProductFeature> features) {
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Double.MAX_VALUE, price);
        Validate.notNull(note);
        Validate.notNull(category);
        Validate.notNull(features);

        this.productId = productId;
        this.name = name;
        this.price = price;
        this.note = note;
        this.category = category;
        this.features = EnumSet.copyOf(features);
    }

    public UUID getProductId() {
        return productId;
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
        return features;
    }
}
