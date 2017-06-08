package com.xeppaka.emi.persistence.view.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class CategoryDto {
    private final UUID categoryId;
    private final String name;
    private final UUID parentCategoryId;
    private final int weight;

    @JsonCreator
    public CategoryDto(@JsonProperty("categoryId") UUID categoryId,
                       @JsonProperty("name") String name,
                       @JsonProperty("parentCategoryId") UUID parentCategoryId,
                       @JsonProperty("weight") int weight) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CategoryDto that = (CategoryDto) o;

        if (weight != that.weight) return false;
        if (!categoryId.equals(that.categoryId)) return false;
        if (!name.equals(that.name)) return false;
        return parentCategoryId.equals(that.parentCategoryId);
    }

    @Override
    public int hashCode() {
        int result = categoryId.hashCode();
        result = 31 * result + name.hashCode();
        result = 31 * result + parentCategoryId.hashCode();
        result = 31 * result + weight;
        return result;
    }

    @Override
    public String toString() {
        return "CategoryDto{" +
                "categoryId=" + categoryId +
                ", name='" + name + '\'' +
                ", parentCategoryId=" + parentCategoryId +
                ", weight=" + weight +
                '}';
    }
}
