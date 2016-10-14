package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class CategoryCreated extends EmiEvent {
    private UUID categoryId;
    private String name;
    private UUID parentCategoryId;

    public CategoryCreated(UUID aggregateId, UUID categoryId, String name, UUID parentCategoryId) {
        super(aggregateId, EmiEventType.CATEGORY_CREATED);
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
