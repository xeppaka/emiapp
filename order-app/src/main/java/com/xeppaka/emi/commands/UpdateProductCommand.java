package com.xeppaka.emi.commands;

import com.xeppaka.ddd.commands.Command;
import com.xeppaka.emi.domain.ProductFeature;

import java.util.Set;
import java.util.UUID;

public class UpdateProductCommand implements Command {
    private final UUID productId;
    private final String name;
    private final int price;
    private final int multiplicity;
    private final UUID categoryId;
    private final Set<ProductFeature> features;
    private final String note;
    private final int weight;

    public UpdateProductCommand(UUID productId, String name, int price, int multiplicity,
                                UUID categoryId, Set<ProductFeature> features,
                                String note, int weight) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.multiplicity = multiplicity;
        this.categoryId = categoryId;
        this.features = features;
        this.note = note;
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

    public UUID getCategoryId() {
        return categoryId;
    }

    public Set<ProductFeature> getFeatures() {
        return features;
    }

    public String getNote() {
        return note;
    }

    public int getWeight() {
        return weight;
    }
}
