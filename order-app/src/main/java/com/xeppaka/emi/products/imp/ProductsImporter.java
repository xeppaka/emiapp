package com.xeppaka.emi.products.imp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xeppaka.emi.products.entities.Product;
import com.xeppaka.emi.products.imp.JsonProducts;
import com.xeppaka.emi.products.persistence.ProductsJdbcRepository;

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
                .map(jsonProduct -> new Product(jsonProduct.getName(), jsonProduct.getPrice()))
                .collect(Collectors.toList());
    }
}
