package com.xeppaka.emi.persistence.view;

import com.xeppaka.emi.persistence.view.dto.CategoryDto;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * Created by Pavel K. on 10/16/16.
 */
@Repository
public class CategoriesRepository {
    @Autowired
    private NamedParameterJdbcTemplate jdbcTemplate;

    public void createCategory(UUID categoryId, String name, int weight) {
        createCategory(categoryId, name, null, weight);
    }

    public void createCategory(UUID categoryId, String name, UUID parentCategoryId, int weight) {
        Validate.notNull(categoryId);
        Validate.notNull(name);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", categoryId);
        sqlParameterSource.addValue("NAME", name);
        sqlParameterSource.addValue("PARENT_CATEGORY", parentCategoryId);
        sqlParameterSource.addValue("WEIGHT", weight);

        jdbcTemplate.update("INSERT INTO CATEGORIES(ID, NAME, PARENT_CATEGORY, WEIGHT) VALUES(:ID, :NAME, :PARENT_CATEGORY, :WEIGHT)", sqlParameterSource);
    }

    public List<CategoryDto> getCategories() {
        return jdbcTemplate.query("SELECT ID, NAME, PARENT_CATEGORY, WEIGHT FROM CATEGORIES", (rs, rowNum) -> {
            final UUID categoryId = UUID.fromString(rs.getString("ID"));
            final String name = rs.getString("NAME");
            final String parentCategoryIdStr = rs.getString("PARENT_CATEGORY");
            final UUID parentCategoryId = parentCategoryIdStr == null ? null : UUID.fromString(parentCategoryIdStr);
            final int weight = rs.getInt("WEIGHT");

            return new CategoryDto(categoryId, name, parentCategoryId, weight);
        });
    }

    public List<CategoryDto> getCategories(Collection<UUID> ids) {
        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("IDS", ids);

        return jdbcTemplate.query("SELECT ID, NAME, PARENT_CATEGORY, WEIGHT FROM CATEGORIES WHERE ID IN (:IDS)", sqlParameterSource, (rs, rowNum) -> {
            final UUID categoryId = UUID.fromString(rs.getString("ID"));
            final String name = rs.getString("NAME");
            final String parentCategoryIdStr = rs.getString("PARENT_CATEGORY");
            final UUID parentCategoryId = parentCategoryIdStr == null ? null : UUID.fromString(parentCategoryIdStr);
            final int weight = rs.getInt("WEIGHT");

            return new CategoryDto(categoryId, name, parentCategoryId, weight);
        });
    }

    public void updateCategoryName(UUID categoryId, String name) {
        Validate.notNull(categoryId);
        Validate.notNull(name);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", categoryId);
        sqlParameterSource.addValue("NAME", name);

        jdbcTemplate.update("UPDATE CATEGORIES SET NAME = :NAME WHERE ID = :ID", sqlParameterSource);
    }

    public void updateCategoryParent(UUID categoryId, UUID parentCategoryId) {
        Validate.notNull(categoryId);
        Validate.notNull(parentCategoryId);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", categoryId);
        sqlParameterSource.addValue("PARENT_CATEGORY", parentCategoryId);

        jdbcTemplate.update("UPDATE CATEGORIES SET PARENT_CATEGORY = :PARENT_CATEGORY WHERE ID = :ID", sqlParameterSource);
    }

    public void updateCategoryWeight(UUID categoryId, int weight) {
        Validate.notNull(categoryId);
        Validate.inclusiveBetween(0, Integer.MAX_VALUE, weight);

        final MapSqlParameterSource sqlParameterSource = new MapSqlParameterSource();
        sqlParameterSource.addValue("ID", categoryId);
        sqlParameterSource.addValue("WEIGHT", weight);

        jdbcTemplate.update("UPDATE CATEGORIES SET WEIGHT = :WEIGHT WHERE ID = :ID", sqlParameterSource);
    }
}
