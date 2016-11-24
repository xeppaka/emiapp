package com.xeppaka.emi.persistence.view;

import com.xeppaka.emi.persistence.view.dto.CategoryDto;
import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

/**
 * Created by Pavel K. on 10/16/16.
 */
@Repository
public class CategoriesRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void createCategory(UUID categoryId, String name, int weight) {
        createCategory(categoryId, name, null, weight);
    }

    public void createCategory(UUID categoryId, String name, UUID parentCategoryId, int weight) {
        Validate.notNull(categoryId);
        Validate.notNull(name);

        jdbcTemplate.update("INSERT INTO CATEGORIES(ID, NAME, PARENT_CATEGORY, WEIGHT) VALUES(?, ?, ?, ?)", categoryId, name, parentCategoryId, weight);
    }

    public List<CategoryDto> getCategories() {
        return jdbcTemplate.query("SELECT ID, NAME, PARENT_CATEGORY, WEIGHT FROM CATEGORIES", new Object[]{}, (rs, rowNum) -> {
            final UUID categoryId = UUID.fromString(rs.getString("ID"));
            final String name = rs.getString("NAME");
            final String parentCategoryIdStr = rs.getString("PARENT_CATEGORY");
            final UUID parentCategoryId = parentCategoryIdStr == null ? null : UUID.fromString(parentCategoryIdStr);
            final int weight = rs.getInt("WEIGHT");

            return new CategoryDto(categoryId, name, parentCategoryId, weight);
        });
    }
}
