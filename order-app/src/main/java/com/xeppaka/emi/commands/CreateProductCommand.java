package com.xeppaka.emi.commands;

import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.domain.value.UserName;
import org.apache.commons.lang3.Validate;

import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

/**
 *
 */
public class CreateProductCommand extends EmiCommand {
    private final UUID productId;
    private final String name;
    private final int price;
    private final int multiplicity;
    private final String note;
    private final UUID categoryId;
    private final Set<ProductFeature> features;
    private final boolean visible;

    public CreateProductCommand(UserName userName, UUID productId, String name, int price, int multiplicity, String note, UUID categoryId, Collection<ProductFeature> features, boolean visible) {
        super(userName);
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, price);
        Validate.notNull(note);
        Validate.notNull(features);

        this.productId = productId;
        this.name = name;
        this.price = price;
        this.multiplicity = multiplicity;
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

    public boolean isVisible() {
        return visible;
    }
}
