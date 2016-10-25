package com.xeppaka.emi.persistence.repositories;

import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.persistence.dto.ProductDto;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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

    public void createProduct(UUID productId, String name, int price, int multiplicity, String note, UUID categoryId, Set<ProductFeature> productFeatures, boolean visible) {
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, price);
        Validate.notNull(productFeatures);

        jdbcTemplate.update("INSERT INTO PRODUCTS(ID, NAME, PRICE, MULTIPLICITY, FEATURES, NOTE, CATEGORY, VISIBLE) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",
                productId, name, price, multiplicity, productFeaturesToString(productFeatures), note, categoryId, visible);
    }

    public List<ProductDto> getProducts() {
        return jdbcTemplate.query("SELECT ID, NAME, PRICE, MULTIPLICITY, FEATURES, NOTE, CATEGORY, VISIBLE FROM PRODUCTS", new Object[]{}, (rs, rowNum) -> {
            final UUID productId = UUID.fromString(rs.getString("ID"));
            final String name = rs.getString("NAME");
            final int price = rs.getInt("PRICE");
            final int multiplicity = rs.getInt("MULTIPLICITY");
            final Set<ProductFeature> productFeatures = productFeaturesFromString(rs.getString("FEATURES"));
            final String note = rs.getString("NOTE");
            final String categoryIdStr = rs.getString("CATEGORY");
            final UUID categoryId = categoryIdStr == null ? null : UUID.fromString(categoryIdStr);
            final boolean visible = rs.getBoolean("VISIBLE");

            return new ProductDto(productId, name, price, multiplicity, note, productFeatures, categoryId, visible);
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
