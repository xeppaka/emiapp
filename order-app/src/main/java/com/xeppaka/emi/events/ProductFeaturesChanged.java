package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.xeppaka.emi.domain.ProductFeature;

import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;
import java.util.UUID;

public class ProductFeaturesChanged extends EmiEvent {
    private final UUID productId;
    private final Set<ProductFeature> features;

    @JsonCreator
    public ProductFeaturesChanged(@JsonProperty("productId") UUID productId,
                                  @JsonProperty("features") Collection<ProductFeature> features) {
        super(EmiEventType.PRODUCT_FEATURES_CHANGED);

        this.productId = productId;

        if (features.isEmpty()) {
            this.features = EnumSet.noneOf(ProductFeature.class);
        } else {
            this.features = EnumSet.copyOf(features);
        }
    }

    public UUID getProductId() {
        return productId;
    }

    public Set<ProductFeature> getFeatures() {
        return features;
    }
}
