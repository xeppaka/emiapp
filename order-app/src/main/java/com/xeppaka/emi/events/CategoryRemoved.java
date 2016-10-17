package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class CategoryRemoved extends EmiEvent {
    private final UUID categoryId;

    private CategoryRemoved() {
        super(EmiEventType.CATEGORY_REMOVED);
        categoryId = null;
    }

    public CategoryRemoved(UUID categoryId) {
        super(EmiEventType.CATEGORY_REMOVED);
        Validate.notNull(categoryId);

        this.categoryId = categoryId;
    }

    public UUID getCategoryId() {
        return categoryId;
    }
}
