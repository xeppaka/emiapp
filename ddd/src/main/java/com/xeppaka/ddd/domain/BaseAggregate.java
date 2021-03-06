package com.xeppaka.ddd.domain;

import com.xeppaka.ddd.events.Event;
import org.apache.commons.lang3.Validate;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by nnm on 10/12/16.
 */
public abstract class BaseAggregate extends BaseEntity implements Aggregate<UUID> {
    private final List<Event> events = new ArrayList<>();

    public BaseAggregate(UUID id) {
        super(id);
    }

    protected void addEvent(Event event) {
        Validate.notNull(event);

        events.add(event);
    }

    public List<Event> getAndClearEvents() {
        final List<Event> result = new ArrayList<>(events);
        events.clear();

        return result;
    }
}
