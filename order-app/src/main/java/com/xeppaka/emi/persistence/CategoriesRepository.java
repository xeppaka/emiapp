package com.xeppaka.emi.persistence;

import org.apache.commons.lang3.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.util.UUID;

/**
 * Created by Pavel K. on 10/16/16.
 */
@Repository
public class CategoriesRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public UUID createCategory(String name) {
        return createCategory(name, null);
    }

    public UUID createCategory(String name, UUID parentCategory) {
        Validate.notNull(name);

        final KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            final PreparedStatement ps = con.prepareStatement("INSERT INTO CATEGORIES(NAME, PARENT_CATEGORY) VALUES(?, ?)", new String[]{"ID"});
            ps.setString(1, name);
            ps.setObject(2, parentCategory);

            return ps;
        }, keyHolder);

        return (UUID) keyHolder.getKeys().get("SCOPE_IDENTITY()");
    }
}
