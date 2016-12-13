package com.xeppaka.emi.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 */
public class CategoryDeleted extends EmiEvent {
    private final UUID categoryId;

    @JsonCreator
    public CategoryDeleted(@JsonProperty("categoryId") UUID categoryId) {
        super(EmiEventType.CATEGORY_DELETED);
        Validate.notNull(categoryId);

        this.categoryId = categoryId;
    }

    public UUID getCategoryId() {
        return categoryId;
    }
}
