package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public class CategoryNameChanged extends EmiEvent {
    private final UUID categoryId;
    private final String name;

    @JsonCreator
    public CategoryNameChanged(@JsonProperty("categoryId") UUID categoryId,
                               @JsonProperty("name") String name) {
        super(EmiEventType.CATEGORY_NAME_CHANGED);
        Validate.notNull(categoryId);
        Validate.notNull(name);

        this.categoryId = categoryId;
        this.name = name;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public String getName() {
        return name;
    }
}
