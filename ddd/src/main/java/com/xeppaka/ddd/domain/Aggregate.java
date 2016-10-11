package com.xeppaka.ddd.domain;

import com.xeppaka.ddd.events.Event;

/**
 *
 */
public interface Aggregate {
    <E extends Event> void apply(E event);
}
