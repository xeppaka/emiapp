package com.xeppaka.emi.service;

import static org.apache.commons.lang3.Validate.notNull;

import com.xeppaka.ddd.commands.CommandHandleException;
import com.xeppaka.emi.commands.CreateProductCommand;
import com.xeppaka.emi.commands.DeleteProductCommand;
import com.xeppaka.emi.commands.EmiCommandHandler;
import com.xeppaka.emi.commands.UpdateProductCommand;
import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.domain.value.UserName;
import com.xeppaka.emi.persistence.view.ProductsRepository;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductsService {
    @Autowired
    private EmiCommandHandler emiCommandHandler;
    @Autowired
    private ProductsRepository productsRepository;

    public ProductDto createProduct(UserName userName, String name, int price, int multiplicity,
                              String note, UUID categoryId, Collection<ProductFeature> features,
                              String image, int weight) throws EmiWarehouseException {
        try {
            final UUID productId = UUID.randomUUID();
            final CreateProductCommand createProductCommand = new CreateProductCommand(productId, name, price, multiplicity,
                    note, categoryId, features, image, weight);
            emiCommandHandler.handle(userName, createProductCommand);

            return productsRepository.getProduct(productId);
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while creating product.", e);
        }
    }

    public List<ProductDto> updateProducts(UserName userName, Collection<ProductDto> products) throws EmiWarehouseException {
        try {
            for (ProductDto product : products) {
                emiCommandHandler.handle(userName,
                        new UpdateProductCommand(product.getProductId(), product.getName(), product.getPrice(),
                                product.getMultiplicity(), product.getCategoryId(), product.getFeatures(),
                                product.getImage(), product.getNote(), product.getWeight()));
            }

            return productsRepository.getProducts(products.stream().map(ProductDto::getProductId).collect(Collectors.toList()));
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while updating products.", e);
        }
    }

    public List<ProductDto> getProducts() {
        return productsRepository.getProducts();
    }

    public ProductDto getProduct(UUID id) {
        return productsRepository.getProduct(id);
    }

    public void deleteProduct(UserName userName, UUID productId) throws EmiWarehouseException {
        try {
            emiCommandHandler.handle(userName, new DeleteProductCommand(productId));
        } catch (CommandHandleException e) {
            throw new EmiWarehouseException("Error occurred while deleting product.", e);
        }
    }
}
