package com.xeppaka.ddd.domain;

import com.xeppaka.ddd.events.Event;

import java.util.Collection;

/**
 *
 */
public interface Aggregate<ID> extends Entity<ID> {
    <E extends Event> void apply(E event);
    Collection<Event> getAndClearEvents();
}
