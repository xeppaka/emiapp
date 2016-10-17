package com.xeppaka.emi.persistence;

import com.xeppaka.emi.domain.ProductFeature;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Set;
import java.util.UUID;

/**
 *
 */
@Repository
public class ProductsRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    void createProduct(UUID productId, String name, double price, String note, UUID categoryId, Set<ProductFeature> productFeatures, boolean visible) {
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.exclusiveBetween(0, Double.MAX_VALUE, price);
        Validate.notNull(note);
        Validate.notNull(productFeatures);

        jdbcTemplate.update("INSERT INTO PRODUCTS(ID, NAME, PRICE, FEATURES, NOTE, CATEGORY, VISIBLE) VALUES(?, ?, ?, ?, ?, ?, ?)",
                productId, name, price, productFeatures, note, categoryId, visible);
    }
}
