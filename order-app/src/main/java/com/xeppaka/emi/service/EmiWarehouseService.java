package com.xeppaka.emi.service;

import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.emi.commands.CreateCategoryCommand;
import com.xeppaka.emi.commands.CreateProductCommand;
import com.xeppaka.emi.commands.EmiCommandHandler;
import com.xeppaka.emi.commands.UpdateProductCommand;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.domain.entities.Product;
import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.repositories.CategoriesRepository;
import com.xeppaka.emi.persistence.repositories.ProductsRepository;
import com.xeppaka.emi.persistence.dto.CategoryDto;
import com.xeppaka.emi.persistence.dto.ProductDto;
import com.xeppaka.emi.service.dto.EmiWarehouseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
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
    private EmiCommandHandler emiCommandHandler;
    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private CategoriesRepository categoriesRepository;

    public UUID createProduct(UserName userName, String name, int price, int multiplicity, String note, UUID categoryId, Collection<ProductFeature> features, boolean visible) throws EmiWarehouseException {
        try {
            final UUID productId = UUID.randomUUID();
            final CreateProductCommand createProductCommand = new CreateProductCommand(productId, name, price, multiplicity, note, categoryId, features, visible);
            emiCommandHandler.handle(userName, createProductCommand);

            return productId;
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while creating product.", e);
        }
    }

    public UUID createCategory(UserName userName, String name, UUID parentCategoryId) throws EmiWarehouseException {
        try {
            final UUID categoryId = UUID.randomUUID();
            final CreateCategoryCommand createCategoryCommand = new CreateCategoryCommand(categoryId, name, parentCategoryId);
            emiCommandHandler.handle(userName, createCategoryCommand);

            return categoryId;
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while creating category.", e);
        }
    }

    public void updateProducts(UserName userName, Collection<ProductDto> products) throws EmiWarehouseException {
        try {
            for (ProductDto product : products) {
                emiCommandHandler.handle(userName,
                        new UpdateProductCommand(product.getProductId(), product.getName(), product.getPrice()));
            }
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while updating products.", e);
        }
    }

    public EmiWarehouseDto getWarehouseState() {
        final Map<UUID, ProductDto> productById = new HashMap<>();
        final Map<UUID, CategoryDto> categoryById = new HashMap<>();

        final List<ProductDto> productDtos = productsRepository.getProducts();
        final List<CategoryDto> categoryDtos = categoriesRepository.getCategories();

        productDtos.forEach(productDto -> productById.put(productDto.getProductId(), productDto));
        categoryDtos.forEach(categoryDto -> categoryById.put(categoryDto.getCategoryId(), categoryDto));

        return new EmiWarehouseDto(productById, categoryById);
    }
}
