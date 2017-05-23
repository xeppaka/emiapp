package com.xeppaka.ddd.commands;

public class CommandHandleException extends Exception {
    private Command command;

    public CommandHandleException(String s, Throwable throwable, Command command) {
        super(s, throwable);
        this.command = command;
    }

    public Command getCommand() {
        return command;
    }

    @Override
    public String toString() {
        return "CommandHandleException{" +
                "command=" + command +
                '}';
    }
}
