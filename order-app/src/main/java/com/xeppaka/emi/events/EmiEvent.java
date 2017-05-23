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
        @JsonSubTypes.Type(value = ProductDeleted.class, name = "PRODUCT_DELETED"),
        @JsonSubTypes.Type(value = ProductNameChanged.class, name = "PRODUCT_NAME_CHANGED"),
        @JsonSubTypes.Type(value = ProductPriceChanged.class, name = "PRODUCT_PRICE_CHANGED"),
        @JsonSubTypes.Type(value = ProductCategoryChanged.class, name = "PRODUCT_CATEGORY_CHANGED"),
        @JsonSubTypes.Type(value = ProductWeightChanged.class, name = "PRODUCT_WEIGHT_CHANGED"),
        @JsonSubTypes.Type(value = ProductNoteChanged.class, name = "PRODUCT_NOTE_CHANGED"),
        @JsonSubTypes.Type(value = ProductFeaturesChanged.class, name = "PRODUCT_FEATURES_CHANGED"),
        @JsonSubTypes.Type(value = ProductMultiplicityChanged.class, name = "PRODUCT_MULTIPLICITY_CHANGED"),
        @JsonSubTypes.Type(value = ProductImageChanged.class, name = "PRODUCT_IMAGE_CHANGED"),
        @JsonSubTypes.Type(value = ProductImageThumbnailChanged.class, name = "PRODUCT_IMAGE_THUMBNAIL_CHANGED"),
        @JsonSubTypes.Type(value = CategoryCreated.class, name = "CATEGORY_CREATED"),
        @JsonSubTypes.Type(value = CategoryDeleted.class, name = "CATEGORY_DELETED"),
        @JsonSubTypes.Type(value = CategoryNameChanged.class, name = "CATEGORY_NAME_CHANGED"),
        @JsonSubTypes.Type(value = CategoryParentChanged.class, name = "CATEGORY_PARENT_CHANGED"),
        @JsonSubTypes.Type(value = CategoryWeightChanged.class, name = "CATEGORY_WEIGHT_CHANGED")
})
public abstract class EmiEvent extends BaseEvent<EmiEventType> {
    public EmiEvent(EmiEventType eventType) {
        super(eventType);
    }
}
