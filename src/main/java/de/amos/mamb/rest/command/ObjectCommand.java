package de.amos.mamb.rest.command;

public interface ObjectCommand<T extends Object> extends Command {

    T execute();
}
