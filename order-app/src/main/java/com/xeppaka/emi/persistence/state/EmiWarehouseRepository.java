package com.xeppaka.emi.persistence.state;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xeppaka.ddd.events.Event;
import com.xeppaka.ddd.events.EventBus;
import com.xeppaka.ddd.persistence.AggregateRepository;
import com.xeppaka.ddd.persistence.RepositoryException;
import com.xeppaka.emi.domain.EmiWarehouse;
import com.xeppaka.emi.events.EmiEvent;
import org.apache.commons.lang3.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.sql.Types;
import java.text.MessageFormat;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 *
 */
@Repository
public class EmiWarehouseRepository implements AggregateRepository<UUID, EmiWarehouse> {
    private static final Logger log = LoggerFactory.getLogger(EmiWarehouseRepository.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private EventBus eventBus;

    private volatile EmiWarehouse emiWarehouse;
    private Lock emiWarehouseLoadLock = new ReentrantLock();

    static {
        objectMapper.findAndRegisterModules();
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public EmiWarehouse find(UUID id) {
        Validate.notNull(id);

        if (!EmiWarehouse.AGGREGATE_ID.equals(id)) {
            return null;
        }

        if (emiWarehouse == null) {
            try {
                emiWarehouseLoadLock.lock();
                if (emiWarehouse == null) {
                    emiWarehouse = loadEmiWarehouseAggregate(id);
                }
            } finally {
                emiWarehouseLoadLock.unlock();
            }
        }

        return emiWarehouse;
    }

    private EmiWarehouse loadEmiWarehouseAggregate(UUID id) {
        final List<String> eventDatas = jdbcTemplate.queryForList("SELECT EVENT_DATA FROM EVENTS WHERE AGGREGATE_ID=? ORDER BY SEQUENCE ASC", new Object[]{id}, new int[]{Types.VARCHAR}, String.class);
        final EmiWarehouse emiWarehouse = new EmiWarehouse();

        for (String eventData : eventDatas) {
            try {
                final EmiEvent event = objectMapper.readValue(eventData, EmiEvent.class);
                emiWarehouse.apply(event);
            } catch (IOException e) {
                log.error("IOException", e);
            }
        }

        return emiWarehouse;
    }

    @Override
    public void save(String userName, EmiWarehouse emiWarehouse) throws RepositoryException {
        Validate.notNull(userName);
        Validate.notNull(emiWarehouse);

        final Collection<Event> events = emiWarehouse.getAndClearEvents();

        final UUID aggregateId = emiWarehouse.getId();

        for (Event event : events) {
            try {
                postEvent(event);
            } catch (Exception e) {
                log.error(MessageFormat.format("Error occurred while posting event: {0}.", event), e);
                throw new RepositoryException(e);
            }

            try {
                saveEvent(aggregateId, userName, event);
            } catch (Exception e) {
                log.error(MessageFormat.format("Error occurred while saving event: {0}.", event), e);
                throw new RepositoryException(e);
            }
        }
    }

    private void postEvent(Event event) {
        log.trace("Post event: {}.", event);

        eventBus.post(event);
    }

    private void saveEvent(UUID id, String userName, Event event) throws JsonProcessingException {
        log.trace("Saving event: {}.", event);

        final String eventStr = objectMapper.writeValueAsString(event);
        log.debug("Event data: {}.", eventStr);

        jdbcTemplate.update("INSERT INTO EVENTS(AGGREGATE_ID, EVENT_DATA, USER) VALUES (?, ?, ?)", id, eventStr, userName);
    }
}
