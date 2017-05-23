package com.xeppaka.emi.persistence.view.dto;

import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.xeppaka.emi.domain.ProductFeature;

public class ProductDto {
    private final UUID productId;
    private final String name;
    private final int price;
    private final int multiplicity;
    private final String note;
    private final UUID categoryId;
    private final Set<ProductFeature> features = EnumSet.noneOf(ProductFeature.class);
    private final String imageThumbnail;
    private final String image;
    private final int weight;

    @JsonCreator
    public ProductDto(@JsonProperty("productId") UUID productId,
                      @JsonProperty("name") String name,
                      @JsonProperty("price") int price,
                      @JsonProperty("multiplicity") int multiplicity,
                      @JsonProperty("note") String note,
                      @JsonProperty("features") Set<ProductFeature> features,
                      @JsonProperty("imageThumbnail") String imageThumbnail,
                      @JsonProperty("image") String image,
                      @JsonProperty("categoryId") UUID categoryId,
                      @JsonProperty("weight") int weight) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.multiplicity = multiplicity;
        this.note = note;
        this.features.addAll(features);
        this.imageThumbnail = imageThumbnail;
        this.image = image;
        this.categoryId = categoryId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductDto that = (ProductDto) o;

        if (price != that.price) return false;
        if (multiplicity != that.multiplicity) return false;
        if (weight != that.weight) return false;
        if (!productId.equals(that.productId)) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (note != null ? !note.equals(that.note) : that.note != null) return false;
        if (categoryId != null ? !categoryId.equals(that.categoryId) : that.categoryId != null) return false;
        if (!features.equals(that.features)) return false;
        if (imageThumbnail != null ? !imageThumbnail.equals(that.imageThumbnail) : that.imageThumbnail != null)
            return false;
        return image != null ? image.equals(that.image) : that.image == null;
    }

    @Override
    public int hashCode() {
        int result = productId.hashCode();
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + price;
        result = 31 * result + multiplicity;
        result = 31 * result + (note != null ? note.hashCode() : 0);
        result = 31 * result + (categoryId != null ? categoryId.hashCode() : 0);
        result = 31 * result + features.hashCode();
        result = 31 * result + (imageThumbnail != null ? imageThumbnail.hashCode() : 0);
        result = 31 * result + (image != null ? image.hashCode() : 0);
        result = 31 * result + weight;
        return result;
    }

    @Override
    public String toString() {
        return "ProductDto{" +
                "productId=" + productId +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", multiplicity=" + multiplicity +
                ", note='" + note + '\'' +
                ", categoryId=" + categoryId +
                ", features=" + features +
                ", imageThumbnail='" + imageThumbnail + '\'' +
                ", image='" + image + '\'' +
                ", weight=" + weight +
                '}';
    }
}
