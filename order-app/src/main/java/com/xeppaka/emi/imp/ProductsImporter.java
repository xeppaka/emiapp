package com.xeppaka.emi.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xeppaka.emi.entities.Product;
import com.xeppaka.emi.entities.ProductType;
import com.xeppaka.emi.imp.JsonProducts;
import com.xeppaka.emi.persistence.ProductsJdbcRepository;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

/**
 *
 */
public class ProductsImporter {
    private ProductsJdbcRepository productsJdbcRepository;

    public ProductsImporter(ProductsJdbcRepository productsJdbcRepository) {
        this.productsJdbcRepository = productsJdbcRepository;
    }

    public void importProducts(Path jsonFile) throws IOException {
        final List<Product> products = readProducts(jsonFile);
        for (Product p : products) {
            productsJdbcRepository.save(p);
        }
    }

    private List<Product> readProducts(Path jsonFile) throws IOException {
        final ObjectMapper objectMapper = new ObjectMapper();
        JsonProducts jsonProducts = objectMapper.readValue(jsonFile.toFile(), JsonProducts.class);

        return jsonProducts.getProductsList().stream()
                .map(jsonProduct -> new Product(ProductType.MAIN, jsonProduct.getName(), jsonProduct.getPrice(), 0))
                .collect(Collectors.toList());
    }
}