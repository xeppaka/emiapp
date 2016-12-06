package com.xeppaka.emi.events;

import java.util.UUID;

import org.apache.commons.lang3.Validate;

/**
 *
 */
public class CategoryParentChanged extends EmiEvent {
    private final UUID categoryId;
    private final UUID parentCategoryId;

    public CategoryParentChanged(UUID categoryId, UUID parentCategoryId) {
        super(EmiEventType.CATEGORY_PARENT_CHANGED);

        this.categoryId = categoryId;
        this.parentCategoryId = parentCategoryId;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public UUID getParentCategoryId() {
        return parentCategoryId;
    }
}
