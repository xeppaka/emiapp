package com.xeppaka.emi.persistence.view;

import com.xeppaka.emi.domain.ProductFeature;
import com.xeppaka.emi.persistence.view.dto.ProductDto;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collection;
import java.util.Collections;
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
    private static final ProductDtoRowMapper PRODUCT_DTO_ROW_MAPPER = new ProductDtoRowMapper();

    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public void createProduct(UUID productId, String name, int price, int multiplicity, String note,
                              UUID categoryId, Set<ProductFeature> productFeatures, String imageThumbnail, String image, int weight) {
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
        sqlParameterSource.addValue("IMAGE_THUMBNAIL", image);
        sqlParameterSource.addValue("IMAGE", image);
        sqlParameterSource.addValue("NOTE", note);
        sqlParameterSource.addValue("CATEGORY", categoryId);
        sqlParameterSource.addValue("WEIGHT", weight);

        jdbcTemplate.update("INSERT INTO PRODUCTS(ID, NAME, PRICE, MULTIPLICITY, FEATURES, IMAGE_THUMBNAIL, IMAGE, NOTE, CATEGORY, WEIGHT) " +
                "VALUES(:ID, :NAME, :PRICE, :MULTIPLICITY, :FEATURES, :IMAGE_THUMBNAIL, :IMAGE, :NOTE, :CATEGORY, :WEIGHT)", sqlParameterSource);
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

    public void updateProductCategory(UUID productId, UUID categoryId) {
        Validate.notNull(productId);
        Validate.notNull(categoryId);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("CATEGORY", categoryId);

        jdbcTemplate.update("UPDATE PRODUCTS SET CATEGORY = :CATEGORY WHERE ID = :ID", sqlParameterSource);
    }

    public List<ProductDto> getProducts() {
        return jdbcTemplate.query("SELECT ID, NAME, PRICE, MULTIPLICITY, FEATURES, IMAGE_THUMBNAIL, IMAGE, NOTE, CATEGORY, WEIGHT FROM PRODUCTS", PRODUCT_DTO_ROW_MAPPER);
    }

    public ProductDto getProduct(UUID id) {
        return getProducts(Collections.singletonList(id)).get(0);
    }

    public List<ProductDto> getProducts(Collection<UUID> ids) {
        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("IDS", ids);

        return jdbcTemplate.query("SELECT ID, NAME, PRICE, MULTIPLICITY, FEATURES, IMAGE_THUMBNAIL, IMAGE, NOTE, CATEGORY, WEIGHT FROM PRODUCTS WHERE ID IN (:IDS) ",
                sqlParameterSource, PRODUCT_DTO_ROW_MAPPER);
    }

    public List<ProductDto> getProductsForCategories(Collection<UUID> categoryIds) {
        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("CATEGORY_IDS", categoryIds);

        return jdbcTemplate.query("SELECT ID, NAME, PRICE, MULTIPLICITY, FEATURES, IMAGE_THUMBNAIL, IMAGE, NOTE, CATEGORY, WEIGHT FROM PRODUCTS WHERE CATEGORY IN (:CATEGORY_IDS) ",
                sqlParameterSource, PRODUCT_DTO_ROW_MAPPER);
    }

    public void deleteProduct(UUID productId) {
        Validate.notNull(productId);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);

        jdbcTemplate.update("DELETE FROM PRODUCTS WHERE ID = :ID", sqlParameterSource);
    }

    public void updateProductMultiplicity(UUID productId, int multiplicity) {
        Validate.notNull(productId);
        Validate.inclusiveBetween(1, Integer.MAX_VALUE, multiplicity);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("MULTIPLICITY", multiplicity);

        jdbcTemplate.update("UPDATE PRODUCTS SET MULTIPLICITY = :MULTIPLICITY WHERE ID = :ID", sqlParameterSource);
    }

    public void updateProductNote(UUID productId, String note) {
        Validate.notNull(productId);
        Validate.notNull(note);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("NOTE", note);

        jdbcTemplate.update("UPDATE PRODUCTS SET NOTE = :NOTE WHERE ID = :ID", sqlParameterSource);
    }

    public void updateProductImageThumbnail(UUID productId, String imageThumbnail) {
        Validate.notNull(productId);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("IMAGE_THUMBNAIL", imageThumbnail);

        jdbcTemplate.update("UPDATE PRODUCTS SET IMAGE_THUMBNAIL = :IMAGE_THUMBNAIL WHERE ID = :ID", sqlParameterSource);
    }

    public void updateProductImage(UUID productId, String image) {
        Validate.notNull(productId);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("IMAGE", image);

        jdbcTemplate.update("UPDATE PRODUCTS SET IMAGE = :IMAGE WHERE ID = :ID", sqlParameterSource);
    }

    public void updateProductFeatures(UUID productId, Set<ProductFeature> features) {
        Validate.notNull(productId);
        Validate.notNull(features);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("FEATURES", productFeaturesToString(features));

        jdbcTemplate.update("UPDATE PRODUCTS SET FEATURES = :FEATURES WHERE ID = :ID", sqlParameterSource);
    }

    public void updateProductWeight(UUID productId, int weight) {
        Validate.notNull(productId);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, weight);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", productId);
        sqlParameterSource.addValue("WEIGHT", weight);

        jdbcTemplate.update("UPDATE PRODUCTS SET WEIGHT = :WEIGHT WHERE ID = :ID", sqlParameterSource);
    }

    private static String productFeaturesToString(Set<ProductFeature> productFeatures) {
        if (productFeatures.isEmpty()) {
            return "";
        } else {
            return productFeatures.stream().map(Enum::name).collect(Collectors.joining(":"));
        }
    }

    private static Set<ProductFeature> productFeaturesFromString(String productFeatures) {
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

    private static class ProductDtoRowMapper implements RowMapper<ProductDto> {
        @Override
        public ProductDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            final UUID productId = UUID.fromString(rs.getString("ID"));
            final String name = rs.getString("NAME");
            final int price = rs.getInt("PRICE");
            final int multiplicity = rs.getInt("MULTIPLICITY");
            final Set<ProductFeature> productFeatures = productFeaturesFromString(rs.getString("FEATURES"));
            final String imageThumbnail = rs.getString("IMAGE_THUMBNAIL");
            final String image = rs.getString("IMAGE");
            final String note = rs.getString("NOTE");
            final String categoryIdStr = rs.getString("CATEGORY");
            final UUID categoryId = categoryIdStr == null ? null : UUID.fromString(categoryIdStr);
            final int weight = rs.getInt("WEIGHT");

            return new ProductDto(productId, name, price, multiplicity, note, productFeatures, imageThumbnail, image, categoryId, weight);
        }
    }
}
