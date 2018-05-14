package de.amos.mamb.rest;

public interface Command {

    int httpOnSuccess();

    int httpOnCommandFailed();

    Object execute();
}
