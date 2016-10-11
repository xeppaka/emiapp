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
    private static final String CREATE_TABLE_CATEGORIES_SQL = "CREATE TABLE CATEGORIES (ID UUID NOT NULL, NAME VARCHAR NOT NULL, PARENT_CATEGORY UUID, " +
                                                              "FOREIGN KEY (PARENT_CATEGORY) REFERENCES CATEGORIES(ID) ON DELETE CASCADE)";
    private static final String CREATE_TABLE_PRODUCTS_SQL = "CREATE TABLE PRODUCTS (ID UUID NOT NULL, NAME VARCHAR NOT NULL, PRICE DOUBLE NOT NULL, NOTE VARCHAR, CATEGORY UUID, " +
                                                            "VISIBLE BOOLEAN NOT NULL DEFAULT TRUE, FOREIGN KEY(CATEGORY) REFERENCES CATEGORIES(ID) ON DELETE SET NULL)";
    private static final String CREATE_TABLE_FEATURES_SQL = "CREATE TABLE FEATURES (ID UUID NOT NULL, NAME VARCHAR NOT NULL)";
    private static final String CREATE_TABLE_PRODUCT_FEATURES_SQL = "CREATE TABLE PRODUCT_FEATURES (ID UUID NOT NULL, PRODUCT UUID NOT NULL, FEATURE UUID NOT NULL," +
                                                                    "FOREIGN KEY(PRODUCT) REFERENCES PRODUCTS(ID) ON DELETE CASCADE, FOREIGN KEY(FEATURE) REFERENCES FEATURES(ID))";

    @Autowired
    private DataSource dataSource;
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void initDb() throws SQLException {
        try (final Connection connection = dataSource.getConnection()) {
            final DatabaseMetaData databaseMetaData = connection.getMetaData();

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

            try (final ResultSet resultSet = databaseMetaData.getTables(null, null, "FEATURES", null)) {
                if (!resultSet.next()) {
                    createTableFeatures();
                }
            }

            try (final ResultSet resultSet = databaseMetaData.getTables(null, null, "PRODUCT_FEATURES", null)) {
                if (!resultSet.next()) {
                    createTableProductFeatures();
                }
            }
        }
    }

    private void createTableProducts() {
        jdbcTemplate.execute(CREATE_TABLE_PRODUCTS_SQL);
    }

    private void createTableCategories() {
        jdbcTemplate.execute(CREATE_TABLE_CATEGORIES_SQL);
    }

    private void createTableFeatures() {
        jdbcTemplate.execute(CREATE_TABLE_FEATURES_SQL);
    }

    private void createTableProductFeatures() {
        jdbcTemplate.execute(CREATE_TABLE_PRODUCT_FEATURES_SQL);
    }
}
