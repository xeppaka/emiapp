package com.xeppaka.emi.service;

/**
 * Created by Pavel K. on 10/17/16.
 */
public class EmiWarehouseException extends Exception {
    public EmiWarehouseException() {
        super();
    }

    public EmiWarehouseException(String s) {
        super(s);
    }

    public EmiWarehouseException(String s, Throwable throwable) {
        super(s, throwable);
    }

    public EmiWarehouseException(Throwable throwable) {
        super(throwable);
    }
}
