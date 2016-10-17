package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class CategoryCreated extends EmiEvent {
    private final UUID categoryId;
    private final String name;
    private final UUID parentCategoryId;

    private CategoryCreated() {
        super(EmiEventType.CATEGORY_CREATED);
        categoryId = null;
        name = null;
        parentCategoryId = null;
    }

    public CategoryCreated(UUID categoryId, String name, UUID parentCategoryId) {
        super(EmiEventType.CATEGORY_CREATED);
        Validate.notNull(name);
        Validate.notNull(categoryId);

        this.categoryId = categoryId;
        this.name = name;
        this.parentCategoryId = parentCategoryId;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public String getName() {
        return name;
    }

    public UUID getParentCategoryId() {
        return parentCategoryId;
    }
}
