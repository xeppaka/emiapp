package com.xeppaka.emi.events;

import com.xeppaka.ddd.events.BaseEvent;

/**
 * Created by Pavel K. on 10/11/16.
 */
public abstract class EmiEvent extends BaseEvent<EmiEventType> {
    public EmiEvent(EmiEventType eventType) {
        super(eventType);
    }
}
