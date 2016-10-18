package com.xeppaka.emi.persistence;

import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
}
