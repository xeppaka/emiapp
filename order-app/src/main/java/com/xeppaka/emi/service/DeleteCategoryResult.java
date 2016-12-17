package com.xeppaka.emi.service;

import java.util.List;
import java.util.UUID;

import com.xeppaka.emi.persistence.view.dto.ProductDto;

public class DeleteCategoryResult {
    private final List<UUID> deletedCategories;
    private final List<ProductDto> updatedProducts;

    public DeleteCategoryResult(List<UUID> deletedCategories, List<ProductDto> updatedProducts) {
        this.deletedCategories = deletedCategories;
        this.updatedProducts = updatedProducts;
    }

    public List<UUID> getDeletedCategories() {
        return deletedCategories;
    }

    public List<ProductDto> getUpdatedProducts() {
        return updatedProducts;
    }
}
