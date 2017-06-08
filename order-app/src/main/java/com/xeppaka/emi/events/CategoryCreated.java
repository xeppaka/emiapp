package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.Validate;

import java.util.UUID;

public class CategoryCreated extends EmiEvent {
    private final UUID categoryId;
    private final String name;
    private final UUID parentCategoryId;
    private final int weight;

    @JsonCreator
    public CategoryCreated(@JsonProperty("categoryId") UUID categoryId,
                           @JsonProperty("name") String name,
                           @JsonProperty("parentCategoryId") UUID parentCategoryId,
                           @JsonProperty("weight") int weight) {
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
