package com.xeppaka.emi.persistence.view.dto;

import java.util.UUID;

/**
 * Created by nnm on 10/18/16.
 */
public class CategoryDto {
    private final UUID categoryId;
    private final String name;
    private final UUID parentCategoryId;

    public CategoryDto(UUID categoryId, String name, UUID parentCategoryId) {
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
