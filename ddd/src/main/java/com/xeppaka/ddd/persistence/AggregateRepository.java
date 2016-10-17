package com.xeppaka.ddd.persistence;

import com.xeppaka.ddd.domain.Aggregate;

/**
 *
 */
public interface AggregateRepository<ID, T extends Aggregate> {
    T find(ID id) throws RepositoryException;
    void save(T aggregate) throws RepositoryException;
}
