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
    private UUID categoryId;
    private String note;
    private int multiplicity;
    private int weight;
    private Set<ProductFeature> productFeatures = EnumSet.noneOf(ProductFeature.class);
    private String imageThumbnail;
    private String image;

    public Product(UUID id, String name, int price, int multiplicity,
                   UUID categoryId, String note, int weight, Collection<ProductFeature> features,
                   String imageThumbnail, String image) {
        super(id);
        setName(name);
        setPrice(price);
        setCategoryId(categoryId);
        setNote(note);
        setWeight(weight);
        setFeatures(features);
        setImageThumbnail(imageThumbnail);
        setImage(image);
        setMultiplicity(multiplicity);
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

    public int getMultiplicity() {
        return multiplicity;
    }

    public void setMultiplicity(int multiplicity) {
        Validate.inclusiveBetween(1, Integer.MAX_VALUE, multiplicity);

        this.multiplicity = multiplicity;
    }

    public String getNote() {
        return note;
    }

    public Set<ProductFeature> getFeatures() {
        return productFeatures;
    }

    public void setFeatures(Collection<ProductFeature> features) {
        if (features.isEmpty()) {
            this.productFeatures = EnumSet.noneOf(ProductFeature.class);
        } else {
            this.productFeatures = EnumSet.copyOf(features);
        }
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getImageThumbnail() {
        return imageThumbnail;
    }

    public void setImageThumbnail(String imageThumbnail) {
        this.imageThumbnail = imageThumbnail;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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
        Validate.notNull(categoryId);
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
