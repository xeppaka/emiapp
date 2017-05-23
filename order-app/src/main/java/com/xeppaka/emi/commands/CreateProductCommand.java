package com.xeppaka.emi.commands;

import com.xeppaka.ddd.commands.Command;
import com.xeppaka.emi.domain.ProductFeature;
import org.apache.commons.lang3.Validate;

import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

/**
 *
 */
public class CreateProductCommand implements Command {
    private final UUID productId;
    private final String name;
    private final int price;
    private final int multiplicity;
    private final String note;
    private final UUID categoryId;
    private final Set<ProductFeature> features;
    private final String imageThumbnail;
    private final String image;
    private final int weight;

    public CreateProductCommand(UUID productId, String name, int price, int multiplicity,
                                String note, UUID categoryId, Collection<ProductFeature> features,
                                String imageThumbnail, String image, int weight) {
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, price);
        Validate.inclusiveBetween(1, Integer.MAX_VALUE, multiplicity);
        Validate.notNull(features);

        this.productId = productId;
        this.name = name;
        this.price = price;
        this.multiplicity = multiplicity;
        this.note = note;
        this.categoryId = categoryId;
        this.features = EnumSet.copyOf(features);
        this.imageThumbnail = imageThumbnail;
        this.image = image;
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

    public String getImageThumbnail() {
        return imageThumbnail;
    }

    public String getImage() {
        return image;
    }

    public int getWeight() {
        return weight;
    }
}
