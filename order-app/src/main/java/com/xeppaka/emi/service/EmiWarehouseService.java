package com.xeppaka.emi.service;

import com.xeppaka.emi.persistence.view.CategoriesRepository;
import com.xeppaka.emi.persistence.view.ProductsRepository;
import com.xeppaka.emi.persistence.view.dto.CategoryDto;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 *
 */
@Service
public class EmiWarehouseService {
    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private CategoriesRepository categoriesRepository;

    public EmiWarehouseState getWarehouseState() {
        final Map<UUID, ProductDto> productById = new HashMap<>();
        final Map<UUID, CategoryDto> categoryById = new HashMap<>();

        final List<ProductDto> productDtos = productsRepository.getProducts();
        final List<CategoryDto> categoryDtos = categoriesRepository.getCategories();

        productDtos.forEach(productDto -> productById.put(productDto.getProductId(), productDto));
        categoryDtos.forEach(categoryDto -> categoryById.put(categoryDto.getCategoryId(), categoryDto));

        return new EmiWarehouseState(productById, categoryById);
    }

    public static class EmiWarehouseState {
        private final Map<UUID, ProductDto> productById;
        private final Map<UUID, CategoryDto> categoryById;

        private EmiWarehouseState() {
            productById = null;
            categoryById = null;
        }

        public EmiWarehouseState(Map<UUID, ProductDto> productById, Map<UUID, CategoryDto> categoryById) {
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
}
