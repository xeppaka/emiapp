package com.xeppaka.emi.persistence.repositories;

import com.xeppaka.emi.persistence.dto.CategoryDto;
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

    public void createCategory(UUID categoryId, String name) {
        createCategory(categoryId, name, null);
    }

    public void createCategory(UUID categoryId, String name, UUID parentCategoryId) {
        Validate.notNull(categoryId);
        Validate.notNull(name);

        jdbcTemplate.update("INSERT INTO CATEGORIES(ID, NAME, PARENT_CATEGORY) VALUES(?, ?, ?)", categoryId, name, parentCategoryId);
    }

    public List<CategoryDto> getCategories() {
        return jdbcTemplate.query("SELECT ID, NAME, PARENT_CATEGORY FROM CATEGORIES", new Object[]{}, (rs, rowNum) -> {
            final UUID categoryId = UUID.fromString(rs.getString("ID"));
            final String name = rs.getString("NAME");
            final String parentCategoryIdStr = rs.getString("PARENT_CATEGORY");
            final UUID parentCategoryId = parentCategoryIdStr == null ? null : UUID.fromString(parentCategoryIdStr);

            return new CategoryDto(categoryId, name, parentCategoryId);
        });
    }
}
