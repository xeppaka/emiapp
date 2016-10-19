package com.xeppaka.emi.events;

import com.xeppaka.emi.domain.ProductFeature;
import org.apache.commons.lang3.Validate;

import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

/**
 *
 */
public class ProductCreated extends EmiEvent {
    private final UUID productId;
    private final String name;
    private final int price;
    private final String note;
    private final UUID categoryId;
    private final Set<ProductFeature> features;
    private final boolean visible;

    private ProductCreated() {
        super(EmiEventType.PRODUCT_CREATED);

        productId = null;
        name = null;
        price = 0;
        note = null;
        categoryId = null;
        features = null;
        visible = false;
    }

    public ProductCreated(UUID productId,
                          String name,
                          int price,
                          String note,
                          UUID categoryId,
                          Collection<ProductFeature> features,
                          boolean visible) {
        super(EmiEventType.PRODUCT_CREATED);
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, price);
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

    public int getPrice() {
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
