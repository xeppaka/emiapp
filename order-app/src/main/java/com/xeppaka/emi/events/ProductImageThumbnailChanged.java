package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 * Created by nnm on 2/6/17.
 */
public class ProductImageThumbnailChanged extends EmiEvent {
    private final UUID productId;
    private final String imageThumbnail;

    @JsonCreator
    public ProductImageThumbnailChanged(@JsonProperty("productId") UUID productId,
                                        @JsonProperty("imageThumbnail") String imageThumbnail) {
        super(EmiEventType.PRODUCT_IMAGE_THUMBNAIL_CHANGED);
        Validate.notNull(productId);

        this.productId = productId;
        this.imageThumbnail = imageThumbnail;
    }

    public UUID getProductId() {
        return productId;
    }

    public String getImageThumbnail() {
        return imageThumbnail;
    }
}
