/*
 * Copyright (C) 2007-2017, GoodData(R) Corporation. All rights reserved.
 */
package com.xeppaka.emi.dto;

import java.util.Map;
import java.util.UUID;

/**
 * TODO: document it!
 */
public class UiEmiWarehouseState {
    private final Map<UUID, UiProductDto> productById;
    private final Map<UUID, UiCategoryDto> categoryById;

    private UiEmiWarehouseState() {
        productById = null;
        categoryById = null;
    }

    public UiEmiWarehouseState(Map<UUID, UiProductDto> productById, Map<UUID, UiCategoryDto> categoryById) {
        this.productById = productById;
        this.categoryById = categoryById;
    }

    public Map<UUID, UiProductDto> getProductById() {
        return productById;
    }

    public Map<UUID, UiCategoryDto> getCategoryById() {
        return categoryById;
    }
}
