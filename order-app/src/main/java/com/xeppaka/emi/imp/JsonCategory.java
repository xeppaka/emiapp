package com.xeppaka.emi.imp;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class JsonCategory {
    private UUID categoryId;
    private String name;
    private Set<JsonCategory> childCategories = new HashSet<>();

    public JsonCategory(UUID categoryId, String name) {
        this.categoryId = categoryId;
        this.name = name;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public String getName() {
        return name;
    }

    public Set<JsonCategory> getChildCategories() {
        return childCategories;
    }

    public JsonCategory getCategory(String[] categoryNames) {
        return getCategory(categoryNames, 0);
    }

    private JsonCategory getCategory(String[] categoryNames, int index) {
        if (index >= categoryNames.length) {
            return this;
        }

        JsonCategory category = null;

        for (JsonCategory jsonCategory : childCategories) {
            if (jsonCategory.getName().equals(categoryNames[index])) {
                category = jsonCategory;
                break;
            }
        }

        if (category == null) {
            category = new JsonCategory(UUID.randomUUID(), categoryNames[index]);
            childCategories.add(category);
        }

        return category.getCategory(categoryNames, ++index);
    }

    @Override
    public String toString() {
        return "JsonCategory{" +
                "categoryId=" + categoryId +
                ", name='" + name + '\'' +
                ", childCategories=" + childCategories +
                '}';
    }
}
