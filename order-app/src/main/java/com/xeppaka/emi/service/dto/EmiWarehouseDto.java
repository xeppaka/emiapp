package com.xeppaka.emi.service.dto;

import com.xeppaka.emi.persistence.dto.CategoryDto;
import com.xeppaka.emi.persistence.dto.ProductDto;

import java.util.Map;
import java.util.UUID;

/**
 *
 */
public class EmiWarehouseDto {
    private final Map<UUID, ProductDto> productById;
    private final Map<UUID, CategoryDto> categoryById;

    public EmiWarehouseDto(Map<UUID, ProductDto> productById, Map<UUID, CategoryDto> categoryById) {
        this.productById = productById;
        this.categoryById = categoryById;
    }

    public Map<UUID, ProductDto> getProductById() {
        return productById;
    }

    public Map<UUID, CategoryDto> getCategoryById() {
        return categoryById;
    }
}
