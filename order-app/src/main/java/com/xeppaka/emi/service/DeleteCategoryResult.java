package com.xeppaka.emi.service;

import com.xeppaka.emi.persistence.view.dto.ProductDto;

import java.util.List;
import java.util.UUID;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DeleteCategoryResult that = (DeleteCategoryResult) o;

        if (!deletedCategories.equals(that.deletedCategories)) return false;
        return updatedProducts.equals(that.updatedProducts);
    }

    @Override
    public int hashCode() {
        int result = deletedCategories.hashCode();
        result = 31 * result + updatedProducts.hashCode();
        return result;
    }

    @Override
    public String toString() {
        return "DeleteCategoryResult{" +
                "deletedCategories=" + deletedCategories +
                ", updatedProducts=" + updatedProducts +
                '}';
    }
}
