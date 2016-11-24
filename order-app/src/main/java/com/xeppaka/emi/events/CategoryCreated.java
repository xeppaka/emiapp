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
    private final int weight;

    private CategoryCreated() {
        super(EmiEventType.CATEGORY_CREATED);
        this.categoryId = null;
        this.name = null;
        this.parentCategoryId = null;
        this.weight = 0;
    }

    public CategoryCreated(UUID categoryId, String name, UUID parentCategoryId, int weight) {
        super(EmiEventType.CATEGORY_CREATED);
        Validate.notNull(name);
        Validate.notNull(categoryId);

        this.categoryId = categoryId;
        this.name = name;
        this.parentCategoryId = parentCategoryId;
        this.weight = weight;
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

    public int getWeight() {
        return weight;
    }
}
