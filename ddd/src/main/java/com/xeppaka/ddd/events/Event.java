package com.xeppaka.ddd.events;

import org.apache.commons.lang3.Validate;

import java.time.LocalDateTime;

/**
 *
 */
public abstract class Event<T> {
    private LocalDateTime creationDate;
    private T eventType;

    public Event(T eventType) {
        Validate.notNull(eventType);

        this.eventType = eventType;
        this.creationDate = LocalDateTime.now();
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public T getType() {
        return eventType;
    }
}
