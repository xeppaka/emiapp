package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.xeppaka.ddd.events.BaseEvent;

/**
 * Created by Pavel K. on 10/11/16.
 */
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = ProductCreated.class, name = "PRODUCT_CREATED"),
        @JsonSubTypes.Type(value = ProductRemoved.class, name = "PRODUCT_REMOVED"),
        @JsonSubTypes.Type(value = CategoryCreated.class, name = "CATEGORY_CREATED"),
        @JsonSubTypes.Type(value = ProductNameChanged.class, name = "PRODUCT_NAME_CHANGED")
})
public abstract class EmiEvent extends BaseEvent<EmiEventType> {
    public EmiEvent(EmiEventType eventType) {
        super(eventType);
    }
}
