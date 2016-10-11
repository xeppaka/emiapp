package com.xeppaka.ddd.persistence;

/**
 *
 */
public interface Repository<ID, E> {
    <T extends E> T find(ID id);
}
