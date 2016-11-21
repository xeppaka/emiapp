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
    private Set<ProductFeature> productFeatures = EnumSet.noneOf(ProductFeature.class);

    public Product(UUID id, String name, int price, String note, UUID categoryId, Collection<ProductFeature> productFeatures) {
        super(id);

        setName(name);
        setPrice(price);
        this.note = note;
        this.categoryId = categoryId;
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

    public void addFeatures(Collection<ProductFeature> features) {
        Validate.notNull(productFeatures);
        this.productFeatures.addAll(features);
    }

    public void addFeature(ProductFeature feature) {
        Validate.notNull(feature);

        productFeatures.add(feature);
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
