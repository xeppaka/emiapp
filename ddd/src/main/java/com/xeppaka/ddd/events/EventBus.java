package com.xeppaka.ddd.events;

/**
 *
 */
public interface EventBus {
    void post(Event event);
    void addListener(EventListener eventListener);
    void removeListener(EventListener eventListener);
}
