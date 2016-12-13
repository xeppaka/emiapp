package com.xeppaka.emi.events;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 *
 */
public class CategoryWeightChanged extends EmiEvent {
    private final UUID categoryId;
    private final int weight;

    @JsonCreator
    public CategoryWeightChanged(@JsonProperty("categoryId") UUID categoryId,
                                 @JsonProperty("weight") int weight) {
        super(EmiEventType.CATEGORY_WEIGHT_CHANGED);

        this.categoryId = categoryId;
        this.weight = weight;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public int getWeight() {
        return weight;
    }
}
