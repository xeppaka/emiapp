package com.xeppaka.emi.events;

import java.util.UUID;

import org.apache.commons.lang3.Validate;

/**
 *
 */
public class CategoryNameChanged extends EmiEvent {
    private final UUID categoryId;
    private final String newName;

    private CategoryNameChanged() {
        super(EmiEventType.PRODUCT_NAME_CHANGED);

        categoryId = null;
        newName = null;
    }

    public CategoryNameChanged(UUID categoryId, String newName) {
        super(EmiEventType.CATEGORY_NAME_CHANGED);
        Validate.notNull(categoryId);
        Validate.notNull(newName);

        this.categoryId = categoryId;
        this.newName = newName;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public String getNewName() {
        return newName;
    }
}
