package com.xeppaka.ddd.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public abstract class BaseEvent<T> implements Event<UUID, T> {
    private UUID aggretageId;
    private T eventType;

    public BaseEvent(UUID aggretageId, T eventType) {
        Validate.notNull(aggretageId);
        Validate.notNull(eventType);

        this.aggretageId = aggretageId;
        this.eventType = eventType;
    }

    public T getType() {
        return eventType;
    }

    @Override
    public UUID getAggregateId() {
        return aggretageId;
    }
}
