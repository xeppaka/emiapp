package com.xeppaka.emi.domain.entities;

import com.xeppaka.ddd.domain.BaseEntity;
import com.xeppaka.emi.domain.ProductFeature;
import org.apache.commons.lang3.Validate;

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

    public Product(UUID id, String name, int price, String note, UUID categoryId, Set<ProductFeature> productFeatures) {
        super(id);

        Validate.notNull(name);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, price);
        Validate.notNull(productFeatures);

        this.name = name;
        this.price = price;
        this.note = note;
        this.categoryId = categoryId;
        this.productFeatures.addAll(productFeatures);
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


    public Set<ProductFeature> getFeatures() {
        return productFeatures;
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
