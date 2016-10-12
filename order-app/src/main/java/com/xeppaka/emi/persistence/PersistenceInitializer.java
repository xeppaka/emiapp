package com.xeppaka.emi.persistence;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 */
@Component
public class PersistenceInitializer {
    private static final Logger log = LoggerFactory.getLogger(PersistenceInitializer.class);

    private static final String CREATE_TABLE_SCHEMA_VERSION_SQL = "CREATE TABLE SCHEMA_VERSION (ID UUID NOT NULL, CURRENT_VERSION INT NOT NULL)";
    private static final String CREATE_TABLE_SCHEMA_HISTORY_SQL = "CREATE TABLE SCHEMA_HISTORY (ID UUID NOT NULL, FROM_VERSION INT NOT NULL, TO_VERSION INT NOT NULL, DATE TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), ERRORS BOOLEAN NOT NULL, ERROR_MESSAGES VARCHAR)";

    private static final int SCHEMA_VERSION = 1;

    @Autowired
    private DataSource dataSource;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private PlatformTransactionManager transactionManager;

    @PostConstruct
    public void initDb() throws SQLException {
        log.trace("Initializing database if needed. Code schema version: {}.", SCHEMA_VERSION);

        try (final Connection connection = dataSource.getConnection()) {
            final DatabaseMetaData databaseMetaData = connection.getMetaData();

            try (final ResultSet resultSet = databaseMetaData.getTables(null, null, "SCHEMA_VERSION", null)) {
                if (!resultSet.next()) {
                    final TransactionStatus tStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
                    try {
                        createUserTables();
                        transactionManager.commit(tStatus);

                        log.info("Database initialization finished successfully.");
                    } catch (DataAccessException e) {
                        log.error("Error occurred while creating DB schema.", e);
                        transactionManager.rollback(tStatus);

                        jdbcTemplate.update("INSERT INTO SCHEMA_HISTORY(ID, FROM_VERSION, TO_VERSION, ERRORS, ERROR_MESSAGES) VALUES(RANDOM_UUID(), 0, ?, TRUE", SCHEMA_VERSION, e.getMessage());
                        throw e;
                    }
                } else {
                    log.info("Database schema initialization is not required.");
                }
            }
        }
    }

    private void createMaintenanceTables() {
        log.trace("Creating maintenance tables.");

        createTableSchemaVersion();
        createTableSchemaHistory();

        log.trace("Creating maintenance tables finished.");
    }

    private void createUserTables() {
        log.trace("Creating business tables.");

        createTableEvents();
        createTableCustomers();
        createTableProducts();
        createTableCategories();

        jdbcTemplate.update("INSERT INTO SCHEMA_HISTORY(ID, FROM_VERSION, TO_VERSION, ERRORS) VALUES(RANDOM_UUID(), 0, ?, FALSE", SCHEMA_VERSION);

        log.trace("Creating business tables finished.");
    }

    private void createTableSchemaVersion() {
        log.trace("Creating table SCHEMA_VERSION. Run SQL {}.", CREATE_TABLE_SCHEMA_VERSION_SQL);
        jdbcTemplate.execute(CREATE_TABLE_SCHEMA_VERSION_SQL);
    }

    private void createTableSchemaHistory() {
        log.trace("Creating table SCHEMA_HISTORY. Run SQL {}.", CREATE_TABLE_SCHEMA_HISTORY_SQL);
        jdbcTemplate.execute(CREATE_TABLE_SCHEMA_HISTORY_SQL);
    }

    private void createTableEvents() {
        log.trace("Creating table EVENTS. Run SQL {}.", CREATE_TABLE_EVENTS_SQL);
        jdbcTemplate.execute(CREATE_TABLE_EVENTS_SQL);
    }

    private void createTableCustomers() {
        log.trace("Creating table CUSTOMERS. Run SQL {}.", CREATE_TABLE_CUSTOMERS_SQL);
        jdbcTemplate.execute(CREATE_TABLE_CUSTOMERS_SQL);
    }

    private void createTableProducts() {
        log.trace("Creating table PRODUCTS. Run SQL {}.", CREATE_TABLE_PRODUCTS_SQL);
        jdbcTemplate.execute(CREATE_TABLE_PRODUCTS_SQL);
    }

    private void createTableCategories() {
        log.trace("Creating table CATEGORIES. Run SQL {}.", CREATE_TABLE_CATEGORIES_SQL);
        jdbcTemplate.execute(CREATE_TABLE_CATEGORIES_SQL);
    }
}
