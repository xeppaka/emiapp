package com.xeppaka.ddd.persistence;

import com.xeppaka.ddd.domain.Aggregate;

/**
 *
 */
public interface Repository<ID, E extends Aggregate> {
    <T extends E> T find(ID id);
    <T extends E> T save(T aggregate);
}
