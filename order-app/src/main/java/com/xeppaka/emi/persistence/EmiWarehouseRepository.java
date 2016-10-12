package com.xeppaka.emi.persistence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xeppaka.ddd.events.Event;
import com.xeppaka.ddd.persistence.Repository;
import com.xeppaka.ddd.persistence.RepositoryException;
import com.xeppaka.emi.domain.EmiWarehouse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.Collection;
import java.util.UUID;

/**
 *
 */
@org.springframework.stereotype.Repository
public class EmiWarehouseRepository implements Repository<UUID, EmiWarehouse> {
    private static final Logger log = LoggerFactory.getLogger(EmiWarehouseRepository.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();

    static {
        objectMapper.findAndRegisterModules();
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public <T extends EmiWarehouse> T find(UUID uuid) {
        return null;
    }

    @Override
    public <T extends EmiWarehouse> T save(T aggregate) throws RepositoryException {
        final Collection<Event> events = aggregate.getAndClearEvents();

        try {
            for (Event event : events) {
                final String eventStr = objectMapper.writeValueAsString(event);
                jdbcTemplate.update("INSERT INTO EVENTS(ID, EVENT_DATA) VALUES (RANDOM_UUID(), ?)", eventStr);
            }
        } catch (JsonProcessingException e) {
            log.error("Error while saving repository events.", e);
            throw new RepositoryException("Error while saving repository events.", e);
        }

        return aggregate;
    }
}
