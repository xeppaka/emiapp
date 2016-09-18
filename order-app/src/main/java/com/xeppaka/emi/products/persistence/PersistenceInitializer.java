package com.xeppaka.emi.products.persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Created by Pavel K. on 9/18/16.
 */
@Component
public class PersistenceInitializer {
    private static final String CREATE_SQL = "CREATE TABLE PRODUCTS (ID UUID NOT NULL, NAME VARCHAR, PRICE DOUBLE)";

    @Autowired
    private DataSource dataSource;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void initDb() throws SQLException {
        try (final Connection connection = dataSource.getConnection()) {
            final DatabaseMetaData databaseMetaData = connection.getMetaData();
            try (final ResultSet resultSet = databaseMetaData.getTables(null, null, "PRODUCTS", null)) {
                if (!resultSet.next()) {
                    createTables();
                }
            }
        }
    }

    private void createTables() {
        jdbcTemplate.execute(CREATE_SQL);
    }
}
