package com.xeppaka.ddd.events;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public abstract class BaseEvent<T> implements Event<UUID, T> {
    private T eventType;

    public BaseEvent(T eventType) {
        Validate.notNull(eventType);

        this.eventType = eventType;
    }

    public T getType() {
        return eventType;
    }
}
