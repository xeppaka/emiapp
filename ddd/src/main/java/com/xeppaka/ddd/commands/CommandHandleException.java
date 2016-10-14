package com.xeppaka.ddd.commands;

/**
 * Created by nnm on 10/14/16.
 */
public class CommandHandleException extends Exception {
    public CommandHandleException(String s) {
        super(s);
    }

    public CommandHandleException(String s, Throwable throwable) {
        super(s, throwable);
    }

    public CommandHandleException(Throwable throwable) {
        super(throwable);
    }

    public CommandHandleException(String s, Throwable throwable, boolean b, boolean b1) {
        super(s, throwable, b, b1);
    }
}
