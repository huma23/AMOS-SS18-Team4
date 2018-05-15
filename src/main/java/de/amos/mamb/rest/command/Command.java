package de.amos.mamb.rest.command;

public interface Command {

    int httpOnSuccess();

    int httpOnCommandFailed();
}
