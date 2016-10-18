package com.xeppaka.emi.commands;

import com.xeppaka.emi.domain.ProductFeature;
import org.apache.commons.lang3.Validate;

import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

/**
 *
 */
public class CreateProductCommand {
    private final UUID productId;
    private final String name;
    private final double price;
    private final String note;
    private final UUID categoryId;
    private final Set<ProductFeature> features;
    private final boolean visible;

    public CreateProductCommand(UUID productId, String name, double price, String note, UUID categoryId, Collection<ProductFeature> features, boolean visible) {
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Double.MAX_VALUE, price);
        Validate.notNull(note);
        Validate.notNull(features);

        this.productId = productId;
        this.name = name;
        this.price = price;
        this.note = note;
        this.categoryId = categoryId;
        this.features = EnumSet.copyOf(features);
        this.visible = visible;
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

    public UUID getCategoryId() {
        return categoryId;
    }

    public Set<ProductFeature> getFeatures() {
        return features;
    }

    public boolean isVisible() {
        return visible;
    }
}
