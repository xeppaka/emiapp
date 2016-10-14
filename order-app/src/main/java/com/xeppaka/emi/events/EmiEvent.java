package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.xeppaka.ddd.events.BaseEvent;

import java.util.UUID;

/**
 * Created by Pavel K. on 10/11/16.
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ProductCreated.class),
        @JsonSubTypes.Type(value = ProductRemoved.class),
        @JsonSubTypes.Type(value = ProductNameChanged.class, name = "BASE_INSTALL")
})
public abstract class EmiEvent extends BaseEvent<EmiEventType> {
    public EmiEvent(UUID aggregateId, EmiEventType eventType) {
        super(aggregateId, eventType);
    }
}
