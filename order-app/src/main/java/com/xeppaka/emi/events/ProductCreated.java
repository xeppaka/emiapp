package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.xeppaka.emi.domain.ProductFeature;
import org.apache.commons.lang3.Validate;

import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductCreated extends EmiEvent {
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

    @JsonCreator
    public ProductCreated(@JsonProperty("productId") UUID productId,
                          @JsonProperty("name") String name,
                          @JsonProperty("price") int price,
                          @JsonProperty("multiplicity") int multiplicity,
                          @JsonProperty("note") String note,
                          @JsonProperty("categoryId") UUID categoryId,
                          @JsonProperty("features") Collection<ProductFeature> features,
                          @JsonProperty("imageThumbnail") String imageThumbnail,
                          @JsonProperty("image") String image,
                          @JsonProperty("weight") int weight) {
        super(EmiEventType.PRODUCT_CREATED);
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, price);
        Validate.inclusiveBetween(1, Integer.MAX_VALUE, multiplicity);
        Validate.notNull(features);

        this.productId = productId;
        this.name = name;
        this.price = price;
        this.multiplicity = multiplicity;
        this.note = note == null ? "" : note;
        this.categoryId = categoryId;
        if (features.isEmpty()) {
            this.features = EnumSet.noneOf(ProductFeature.class);
        } else {
            this.features = EnumSet.copyOf(features);
        }
        this.imageThumbnail = imageThumbnail == null ? "" : imageThumbnail;
        this.image = image == null ? "" : image;
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
