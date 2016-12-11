package com.xeppaka.emi.domain.entities;

import com.xeppaka.ddd.domain.BaseEntity;
import com.xeppaka.emi.domain.ProductFeature;
import org.apache.commons.lang3.Validate;

import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

/**
 *
 */
public class Product extends BaseEntity {
    private String name;
    private int price;
    private String note;
    private UUID categoryId;
    private int weight;
    private Set<ProductFeature> productFeatures = EnumSet.noneOf(ProductFeature.class);

    public Product(UUID id,
                   String name,
                   int price,
                   String note,
                   UUID categoryId,
                   int weight,
                   Collection<ProductFeature> features) {
        super(id);

        setName(name);
        setPrice(price);
        this.note = note;
        this.categoryId = categoryId;
        this.weight = weight;
        if (features.isEmpty()) {
            this.productFeatures = EnumSet.noneOf(ProductFeature.class);
        } else {
            this.productFeatures = EnumSet.copyOf(features);
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        Validate.notNull(name);
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, price);
        this.price = price;
    }

    public String getNote() {
        return note;
    }

    public Set<ProductFeature> getFeatures() {
        return productFeatures;
    }

    public void setProductFeatures(Collection<ProductFeature> productFeatures) {
        this.productFeatures = EnumSet.copyOf(productFeatures);
    }

    public void setNote(String note) {
        this.note = note;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(UUID categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", note='" + note + '\'' +
                ", categoryId=" + categoryId +
                ", productFeatures=" + productFeatures +
                '}';
    }
}
