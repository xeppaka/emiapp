package com.xeppaka.ddd.events;

import java.util.ArrayList;
import java.util.List;

/**
 *
 */
public abstract class BaseEventBus implements EventBus {
    private List<EventListener> listeners = new ArrayList<>();

    @Override
    public void post(Event event) {
        for (EventListener listener : listeners) {
            listener.onEvent(event);
        }
    }

    @Override
    public void addListener(EventListener eventListener) {
        listeners.add(eventListener);
    }

    @Override
    public void removeListener(EventListener eventListener) {
        listeners.remove(eventListener);
    }
}
