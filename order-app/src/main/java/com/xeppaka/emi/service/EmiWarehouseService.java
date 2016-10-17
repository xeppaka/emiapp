package com.xeppaka.emi.service;

import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.emi.commands.CreateCategoryCommand;
import com.xeppaka.emi.commands.CreateProductCommand;
import com.xeppaka.emi.commands.EmiCommandHandler;
import com.xeppaka.emi.domain.ProductFeature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.UUID;

/**
 *
 */
@Service
public class EmiWarehouseService {
    @Autowired
    private EmiCommandHandler emiCommandHandler;

    public UUID createProduct(String name, double price, String note, UUID categoryId, Collection<ProductFeature> features, boolean visible) throws EmiWarehouseException {
        try {
            final UUID productId = UUID.randomUUID();
            final CreateProductCommand createProductCommand = new CreateProductCommand(productId, name, price, note, categoryId, features, visible);
            emiCommandHandler.handle(createProductCommand);

            return productId;
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while creating product.", e);
        }
    }

    public UUID createCategory(String name, UUID parentCategoryId) throws EmiWarehouseException {
        try {
            final UUID categoryId = UUID.randomUUID();
            final CreateCategoryCommand createCategoryCommand = new CreateCategoryCommand(categoryId, name, parentCategoryId);
            emiCommandHandler.handle(createCategoryCommand);

            return categoryId;
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while creating category.", e);
        }
    }
}
