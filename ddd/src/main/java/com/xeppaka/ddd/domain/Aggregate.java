package com.xeppaka.ddd.domain;

import com.xeppaka.ddd.events.Event;

import java.util.Collection;

/**
 *
 */
public interface Aggregate {
    <E extends Event> void apply(E event);
    Collection<Event> getAndClearEvents();
}
