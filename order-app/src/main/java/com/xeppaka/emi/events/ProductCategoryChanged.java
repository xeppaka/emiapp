package com.xeppaka.emi.events;

import java.util.UUID;

/**
 * Created by nnm on 11/20/16.
 */
public class ProductCategoryChanged extends EmiEvent {
    private final UUID productId;
    private final UUID categoryId;

    private ProductCategoryChanged() {
        super(EmiEventType.PRODUCT_CATEGORY_CHANGED);

        productId = null;
        categoryId = null;
    }

    public ProductCategoryChanged(UUID productId, UUID categoryId) {
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
