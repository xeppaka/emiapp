package com.xeppaka.ddd.domain;

import com.xeppaka.ddd.events.Event;
import org.apache.commons.lang3.Validate;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by nnm on 10/12/16.
 */
public abstract class BaseAggregate implements Aggregate {
    private final List<Event> events = new ArrayList<>();

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
