package com.xeppaka.emi.persistence.view;

import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

/**
 *
 */
@Repository
public class ProductsRepository {
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public void createProduct(UUID productId, String name, int price, int multiplicity, String note,
                              UUID categoryId, Set<ProductFeature> productFeatures, int weight) {
        Validate.notNull(productId);
        Validate.notNull(name);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, price);
        Validate.notNull(productFeatures);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("NAME", name);
        sqlParameterSource.addValue("PRICE", price);
        sqlParameterSource.addValue("MULTIPLICITY", multiplicity);
        sqlParameterSource.addValue("FEATURES", productFeaturesToString(productFeatures));
        sqlParameterSource.addValue("NOTE", note);
        sqlParameterSource.addValue("CATEGORY", categoryId);
        sqlParameterSource.addValue("WEIGHT", weight);

        jdbcTemplate.update("INSERT INTO PRODUCTS(ID, NAME, PRICE, MULTIPLICITY, FEATURES, NOTE, CATEGORY, WEIGHT) " +
                        "VALUES(:ID, :NAME, :PRICE, :MULTIPLICITY, :FEATURES, :NOTE, :CATEGORY, :WEIGHT)", sqlParameterSource);
    }

    public void updateProductName(UUID productId, String name) {
        Validate.notNull(productId);
        Validate.notNull(name);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("NAME", name);

        jdbcTemplate.update("UPDATE PRODUCTS SET NAME = :NAME WHERE ID = :ID", sqlParameterSource);
    }

    public void updateProductPrice(UUID productId, int price) {
        Validate.notNull(productId);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, price);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("PRICE", price);

        jdbcTemplate.update("UPDATE PRODUCTS SET PRICE = :PRICE WHERE ID = :ID", sqlParameterSource);
    }

    public List<ProductDto> getProducts() {
        return jdbcTemplate.query("SELECT ID, NAME, PRICE, MULTIPLICITY, FEATURES, NOTE, CATEGORY, WEIGHT FROM PRODUCTS", (rs, rowNum) -> {
            final UUID productId = UUID.fromString(rs.getString("ID"));
            final String name = rs.getString("NAME");
            final int price = rs.getInt("PRICE");
            final int multiplicity = rs.getInt("MULTIPLICITY");
            final Set<ProductFeature> productFeatures = productFeaturesFromString(rs.getString("FEATURES"));
            final String note = rs.getString("NOTE");
            final String categoryIdStr = rs.getString("CATEGORY");
            final UUID categoryId = categoryIdStr == null ? null : UUID.fromString(categoryIdStr);
            final int weight = rs.getInt("WEIGHT");

            return new ProductDto(productId, name, price, multiplicity, note, productFeatures, categoryId, weight);
        });
    }

    public List<ProductDto> getProducts(Collection<UUID> ids) {
        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("IDS", ids);

        return jdbcTemplate.query("SELECT ID, NAME, PRICE, MULTIPLICITY, FEATURES, NOTE, CATEGORY, WEIGHT FROM PRODUCTS WHERE ID IN (:IDS) ", sqlParameterSource, (rs, rowNum) -> {
            final UUID productId = UUID.fromString(rs.getString("ID"));
            final String name = rs.getString("NAME");
            final int price = rs.getInt("PRICE");
            final int multiplicity = rs.getInt("MULTIPLICITY");
            final Set<ProductFeature> productFeatures = productFeaturesFromString(rs.getString("FEATURES"));
            final String note = rs.getString("NOTE");
            final String categoryIdStr = rs.getString("CATEGORY");
            final UUID categoryId = categoryIdStr == null ? null : UUID.fromString(categoryIdStr);
            final int weight = rs.getInt("WEIGHT");

            return new ProductDto(productId, name, price, multiplicity, note, productFeatures, categoryId, weight);
        });
    }

    private String productFeaturesToString(Set<ProductFeature> productFeatures) {
        if (productFeatures.isEmpty()) {
            return "";
        } else {
            return productFeatures.stream().map(Enum::name).collect(Collectors.joining(":"));
        }
    }

    private Set<ProductFeature> productFeaturesFromString(String productFeatures) {
        final Set<ProductFeature> features = EnumSet.noneOf(ProductFeature.class);

        if (productFeatures.isEmpty()) {
            return features;
        }

        final String[] featureNames = productFeatures.split(":");
        for (String featureName : featureNames) {
            features.add(ProductFeature.valueOf(featureName));
        }

        return features;
    }
}
