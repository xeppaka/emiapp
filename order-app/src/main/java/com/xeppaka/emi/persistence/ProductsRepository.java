package com.xeppaka.emi.persistence;

import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.persistence.dto.ProductDto;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 *
 */
@Repository
public class ProductsRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createProduct(UUID productId, String name, double price, String note, UUID categoryId, Set<ProductFeature> productFeatures, boolean visible) {
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.exclusiveBetween(0, Double.MAX_VALUE, price);
        Validate.notNull(note);
        Validate.notNull(productFeatures);

        jdbcTemplate.update("INSERT INTO PRODUCTS(ID, NAME, PRICE, FEATURES, NOTE, CATEGORY, VISIBLE) VALUES(?, ?, ?, ?, ?, ?, ?)",
                productId, name, price, productFeaturesToString(productFeatures), note, categoryId, visible);
    }

    public List<ProductDto> getProducts() {
        return jdbcTemplate.query("SELECT ID, NAME, PRICE, FEATURES, NOTE, CATEGORY, VISIBLE FROM PRODUCTS", new Object[]{}, (rs, rowNum) -> {
            final UUID productId = UUID.fromString(rs.getString("ID"));
            final String name = rs.getString("NAME");
            final double price = rs.getDouble("PRICE");
            final Set<ProductFeature> productFeatures = productFeaturesFromString(rs.getString("FEATURES"));
            final String note = rs.getString("NOTE");
            final String categoryIdStr = rs.getString("CATEGORY");
            final UUID categoryId = categoryIdStr == null ? null : UUID.fromString(categoryIdStr);
            final boolean visible = rs.getBoolean("VISIBLE");

            return new ProductDto(productId, name, price, note, productFeatures, categoryId, visible);
        });
    }

    private String productFeaturesToString(Set<ProductFeature> productFeatures) {
        if (productFeatures.isEmpty()) {
            return null;
        } else {
            return productFeatures.stream().map(Enum::name).collect(Collectors.joining(":"));
        }
    }

    private Set<ProductFeature> productFeaturesFromString(String productFeatures) {
        final Set<ProductFeature> features = EnumSet.noneOf(ProductFeature.class);

        if (productFeatures == null || productFeatures.isEmpty()) {
            return features;
        }

        final String[] featureNames = productFeatures.split(":");
        for (String featureName : featureNames) {
            features.add(ProductFeature.valueOf(featureName));
        }

        return features;
    }
}
