package de.amos.mamb.rest;

public interface Command {

    enum Result {
        FAILED,
        NO_OBJECT
    };

    int httpOnSuccess();

    int httpOnCommandFailed();

    Object execute();
}
