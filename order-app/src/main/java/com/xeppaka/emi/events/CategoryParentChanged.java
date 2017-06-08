package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

/**
 *
 */
public class CategoryParentChanged extends EmiEvent {
    private final UUID categoryId;
    private final UUID parentCategoryId;

    @JsonCreator
    public CategoryParentChanged(@JsonProperty("categoryId") UUID categoryId,
                                 @JsonProperty("parentCategoryId") UUID parentCategoryId) {
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
