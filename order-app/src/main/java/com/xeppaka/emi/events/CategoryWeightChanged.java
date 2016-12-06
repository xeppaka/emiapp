package com.xeppaka.emi.events;

import java.util.UUID;

/**
 *
 */
public class CategoryWeightChanged extends EmiEvent {
    private final UUID categoryId;
    private final int weight;

    private CategoryWeightChanged() {
        super(EmiEventType.CATEGORY_WEIGHT_CHANGED);

        categoryId = null;
        weight = 0;
    }

    public CategoryWeightChanged(UUID categoryId, int weight) {
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
