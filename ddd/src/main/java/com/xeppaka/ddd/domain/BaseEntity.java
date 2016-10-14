package com.xeppaka.ddd.domain;

import org.apache.commons.lang3.Validate;

import java.util.UUID;

/**
 *
 */
public abstract class BaseEntity implements Entity<UUID> {
    private UUID id;

    public BaseEntity() {
        this.id = UUID.randomUUID();
    }

    public BaseEntity(UUID id) {
        Validate.notNull(id);

        this.id = id;
    }

    @Override
    public UUID getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BaseEntity entity = (BaseEntity) o;

        return id != null ? id.equals(entity.id) : entity.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "BaseEntity{" +
                "id=" + id +
                '}';
    }
}
