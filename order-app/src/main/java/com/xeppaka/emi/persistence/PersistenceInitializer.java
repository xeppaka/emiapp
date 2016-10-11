package com.xeppaka.emi.persistence;

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
    private static final String CREATE_TABLE_CUSTOMERS_SQL = "CREATE TABLE CUSTOMERS (ID UUID NOT NULL, NAME VARCHAR NOT NULL, COUNTRY CHAR(2) NOT NULL, EMAIL VARCHAR NOT NULL)";
    private static final String CREATE_TABLE_CATEGORIES_SQL = "CREATE TABLE CATEGORIES (ID UUID NOT NULL, NAME VARCHAR NOT NULL, PARENT_CATEGORY UUID, " +
            "FOREIGN KEY (PARENT_CATEGORY) REFERENCES CATEGORIES(ID) ON DELETE CASCADE)";
    private static final String CREATE_TABLE_PRODUCTS_SQL = "CREATE TABLE PRODUCTS (ID UUID NOT NULL, NAME VARCHAR NOT NULL, PRICE DOUBLE NOT NULL, FEATURES VARCHAR, NOTE VARCHAR, CATEGORY UUID, " +
            "VISIBLE BOOLEAN NOT NULL DEFAULT TRUE, FOREIGN KEY(CATEGORY) REFERENCES CATEGORIES(ID) ON DELETE SET NULL";

    @Autowired
    private DataSource dataSource;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void initDb() throws SQLException {
        try (final Connection connection = dataSource.getConnection()) {
            final DatabaseMetaData databaseMetaData = connection.getMetaData();

            try (final ResultSet resultSet = databaseMetaData.getTables(null, null, "CUSTOMERS", null)) {
                if (!resultSet.next()) {
                    createTableCustomers();
                }
            }

            try (final ResultSet resultSet = databaseMetaData.getTables(null, null, "CATEGORIES", null)) {
                if (!resultSet.next()) {
                    createTableCategories();
                }
            }

            try (final ResultSet resultSet = databaseMetaData.getTables(null, null, "PRODUCTS", null)) {
                if (!resultSet.next()) {
                    createTableProducts();
                }
            }
        }
    }

    private void createTableCustomers() {
        jdbcTemplate.execute(CREATE_TABLE_CUSTOMERS_SQL);
    }

    private void createTableProducts() {
        jdbcTemplate.execute(CREATE_TABLE_PRODUCTS_SQL);
    }

    private void createTableCategories() {
        jdbcTemplate.execute(CREATE_TABLE_CATEGORIES_SQL);
    }
}
