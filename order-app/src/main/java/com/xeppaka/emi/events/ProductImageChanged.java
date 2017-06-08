package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 * Created by nnm on 2/6/17.
 */
public class ProductImageChanged extends EmiEvent {
    private final UUID productId;
    private final String image;

    @JsonCreator
    public ProductImageChanged(@JsonProperty("productId") UUID productId,
                              @JsonProperty("image") String image) {
        super(EmiEventType.PRODUCT_IMAGE_CHANGED);
        Validate.notNull(productId);

        this.productId = productId;
        this.image = image;
    }

    public UUID getProductId() {
        return productId;
    }

    public String getImage() {
        return image;
    }
}
