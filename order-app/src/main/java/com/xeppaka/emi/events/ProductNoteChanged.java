package com.xeppaka.emi.events;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.UUID;

public class ProductNoteChanged extends EmiEvent {
    private final UUID productId;
    private final String note;

    @JsonCreator
    public ProductNoteChanged(@JsonProperty("productId") UUID productId,
                              @JsonProperty("note") String note) {
        super(EmiEventType.PRODUCT_NOTE_CHANGED);

        this.productId = productId;
        this.note = note;
    }

    public UUID getProductId() {
        return productId;
    }

    public String getNote() {
        return note;
    }
}
