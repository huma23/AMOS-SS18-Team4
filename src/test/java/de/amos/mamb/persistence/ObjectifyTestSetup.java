package de.amos.mamb.persistence;

import org.junit.rules.ExternalResource;

public class ObjectifyTestSetup extends ExternalResource {

    @Override
    protected void before() throws Throwable {
        OfyService.factory();
    }

    @Override
    protected void after() {

    }
}
