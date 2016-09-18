package com.xeppaka.ddd.domain;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 * Created by Pavel K. on 9/17/16.
 */
public abstract class Entity {
    private UUID id;

    public Entity() {
        this.id = UUID.randomUUID();
    }

    public Entity(UUID id) {
        Validate.notNull(id);

        this.id = id;
    }

    public UUID getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Entity entity = (Entity) o;

        return id != null ? id.equals(entity.id) : entity.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Entity{" +
                "id=" + id +
                '}';
    }
}
