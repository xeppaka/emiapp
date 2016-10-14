package com.xeppaka.emi.persistence;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xeppaka.ddd.events.Event;
import com.xeppaka.ddd.persistence.Repository;
import com.xeppaka.ddd.persistence.RepositoryException;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.events.EmiEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.io.IOException;
import java.sql.Types;
import java.util.Collection;
import java.util.List;
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
    public EmiWarehouse find(UUID id) {
        if (!EmiWarehouse.AGGREGATE_ID.equals(id)) {
            return null;
        }

        final List<String> eventDatas = jdbcTemplate.queryForList("SELECT EVENT_DATA FROM EVENTS WHERE AGGREGATE_ID=? ORDER BY SEQUENCE ASC", new Object[]{id}, new int[]{Types.VARCHAR}, String.class);
        final EmiWarehouse emiWarehouse = new EmiWarehouse();

        for (String eventData : eventDatas) {
            try {
                final EmiEvent event = objectMapper.readValue(eventData, EmiEvent.class);
                emiWarehouse.apply(event);
            } catch (IOException e) {

            }
        }

        return emiWarehouse;
    }

    @Override
    public void save(EmiWarehouse emiWarehouse) throws RepositoryException {
        final Collection<Event> events = emiWarehouse.getAndClearEvents();

        try {
            for (Event event : events) {
                final String eventStr = objectMapper.writeValueAsString(event);
                jdbcTemplate.update("INSERT INTO EVENTS(AGGREGATE_ID, EVENT_DATA) VALUES (?, ?)", emiWarehouse.getId(), eventStr);
            }
        } catch (JsonProcessingException e) {
            log.error("Error while saving repository events.", e);
            throw new RepositoryException("Error while saving repository events.", e);
        }
    }
}
