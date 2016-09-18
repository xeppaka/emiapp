package com.xeppaka.ddd.persistence;

/**
 * Created by Pavel K. on 9/17/16.
 */
public interface CrudRepository<ID, E> {
    <T extends E> T save(T entity);
    <T extends E> T find(ID id);
    void delete(ID id);
    void delete();
}
