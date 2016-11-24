package com.xeppaka.emi.persistence.view.dto;

import java.util.UUID;

/**
 * Created by nnm on 10/18/16.
 */
public class CategoryDto {
    private final UUID categoryId;
    private final String name;
    private final UUID parentCategoryId;
    private final int weight;

    public CategoryDto() {
        this.categoryId = null;
        this.name = null;
        this.parentCategoryId = null;
        this.weight = 0;
    }

    public CategoryDto(UUID categoryId, String name, UUID parentCategoryId, int weight) {
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
