package com.xeppaka.emi.events;

import com.xeppaka.ddd.events.Event;

/**
 * Created by Pavel K. on 10/11/16.
 */
public abstract class EmiEvent extends Event<EmiEventType> {
    public EmiEvent(EmiEventType eventType) {
        super(eventType);
    }
}
