package com.xeppaka.ddd.events;

/**
 * Created by nnm on 10/12/16.
 */
public interface Event<ID, T> {
    T getType();
}
