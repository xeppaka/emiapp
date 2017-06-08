package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

/**
 * Created by nnm on 11/20/16.
 */
public class ProductCategoryChanged extends EmiEvent {
    private final UUID productId;
    private final UUID categoryId;

    @JsonCreator
    public ProductCategoryChanged(@JsonProperty("productId") UUID productId,
                                  @JsonProperty("categoryId") UUID categoryId) {
        super(EmiEventType.PRODUCT_CATEGORY_CHANGED);

        this.productId = productId;
        this.categoryId = categoryId;
    }

    public UUID getProductId() {
        return productId;
    }

    public UUID getCategoryId() {
        return categoryId;
    }
}
