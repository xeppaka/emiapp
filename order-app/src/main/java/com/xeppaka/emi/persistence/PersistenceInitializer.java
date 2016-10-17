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
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.MessageFormat;

/**
 *
 */
@Component
public class PersistenceInitializer {
    private static final Logger log = LoggerFactory.getLogger(PersistenceInitializer.class);

    private static final String CREATE_TABLE_SCHEMA_VERSION_SQL = "CREATE TABLE SCHEMA_VERSION (ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY, CURRENT_VERSION INT NOT NULL)";
    private static final String CREATE_TABLE_SCHEMA_HISTORY_SQL = "CREATE TABLE SCHEMA_HISTORY (ID UUID NOT NULL DEFAULT RANDOM_UUID() PRIMARY KEY, FROM_VERSION INT NOT NULL, TO_VERSION INT NOT NULL, DATE TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), ERROR BOOLEAN NOT NULL, ERROR_MESSAGES VARCHAR)";

    private static final int SCHEMA_VERSION = 1;

    @Autowired
    private DataSource dataSource;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private PlatformTransactionManager transactionManager;

    @PostConstruct
    public void maintainDb() throws SQLException, IOException {
        log.trace("Running database maintenance if needed. Schema version in the code: {}.", SCHEMA_VERSION);
        createMaintenanceTablesIfRequired();
        runDbSchemaUpgrade();
    }

    private void createMaintenanceTablesIfRequired() throws SQLException {
        try (final Connection connection = dataSource.getConnection()) {
            final DatabaseMetaData databaseMetaData = connection.getMetaData();

            try (final ResultSet resultSet = databaseMetaData.getTables(null, null, "SCHEMA_VERSION", null)) {
                if (!resultSet.next()) {
                    log.info("Table SCHEMA_VERSION is not found. Creating maintenance tables...");

                    try {
                        createTableSchemaVersion();
                        createTableSchemaHistory();
                        log.info("Create maintenance tables finished successfully.");
                    } catch (DataAccessException e) {
                        log.error("Error occurred while creating maintenance tables.", e);
                        throw e;
                    }
                } else {
                    log.info("Table SCHEMA_VERSION is found. No need to create maintenance tables.");
                }
            }
        }
    }

    private void createTableSchemaVersion() {
        log.trace("Creating table SCHEMA_VERSION. Run SQL {}.", CREATE_TABLE_SCHEMA_VERSION_SQL);
        jdbcTemplate.execute(CREATE_TABLE_SCHEMA_VERSION_SQL);
        jdbcTemplate.update("INSERT INTO SCHEMA_VERSION(CURRENT_VERSION) VALUES(?)", 0);
    }

    private void createTableSchemaHistory() {
        log.trace("Creating table SCHEMA_HISTORY. Run SQL {}.", CREATE_TABLE_SCHEMA_HISTORY_SQL);
        jdbcTemplate.execute(CREATE_TABLE_SCHEMA_HISTORY_SQL);
    }

    private void runDbSchemaUpgrade() throws IOException {
        log.trace("Running database schema upgrade.");
        final int nextDbSchemaVersion = queryCurrentSchemaVersion() + 1;

        for (int i = nextDbSchemaVersion; i <= SCHEMA_VERSION; ++i) {
            log.info("Running database schema upgrade to version {}.", i);

            final TransactionStatus tStatus = transactionManager.getTransaction(new DefaultTransactionDefinition());
            try {
                runDbScript(i);
                updateDbSchemaVersion(i);
                insertSuccessUpgrade(i - 1, i);

                transactionManager.commit(tStatus);

                log.info("Database schema upgraded to version {} successfully.", i);
            } catch (DataAccessException e) {
                log.error(MessageFormat.format("Error occurred while running database schema upgrade to version {0}.", i), e);

                transactionManager.rollback(tStatus);
                try {
                    insertFailedUpgrade(i - 1, i, e.getLocalizedMessage());
                } catch (DataAccessException e1) {
                    log.error("Error occurred while inserting failed database schema upgrade.", e1);
                }

                throw e;
            }
        }
    }

    private void runDbScript(int version) throws IOException {
        final String scriptName = MessageFormat.format("{0}.sql", version);
        log.info("Reading script {} for executing...", scriptName);

        try (
                final InputStream scriptStream = ClassLoader.getSystemResourceAsStream(MessageFormat.format("sql/{0}", scriptName));
                final ByteArrayOutputStream outputStream = new ByteArrayOutputStream()
            )
        {
            final byte[] buffer = new byte[2048];
            int length;

            while ((length = scriptStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, length);
            }

            log.info("Executing database upgrade script {}.", scriptName);
            jdbcTemplate.execute(outputStream.toString());
        }
    }

    private void insertSuccessUpgrade(int fromVersion, int toVersion) {
        jdbcTemplate.update("INSERT INTO SCHEMA_HISTORY(FROM_VERSION, TO_VERSION, ERROR) VALUES (?, ?, FALSE)", fromVersion, toVersion);
    }

    private void insertFailedUpgrade(int fromVersion, int toVersion, String messages) {
        jdbcTemplate.update("INSERT INTO SCHEMA_HISTORY(FROM_VERSION, TO_VERSION, ERROR, ERROR_MESSAGES) VALUES (?, ?, TRUE, ?)", fromVersion, toVersion, messages);
    }

    private int queryCurrentSchemaVersion() {
        return jdbcTemplate.queryForObject("SELECT CURRENT_VERSION FROM SCHEMA_VERSION", Integer.class);
    }

    private void updateDbSchemaVersion(int version) {
        jdbcTemplate.update("UPDATE SCHEMA_VERSION SET CURRENT_VERSION = ?", version);
    }
}
