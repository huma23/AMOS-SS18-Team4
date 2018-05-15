package de.amos.mamb.rest.command;

public interface ResponseCommand extends Command {

    public interface Result {
        public static final String FAILED = "FAILED";
        public static final String NO_STRING = "NO_STRING";
    }

    String execute();
}
