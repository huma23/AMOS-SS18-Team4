package de.amos.mamb.persistence;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import org.junit.rules.ExternalResource;

public class LocalDataStoreTestSetup extends ExternalResource {

    protected final LocalServiceTestHelper helper = new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());


    @Override
    protected void before() throws Throwable {
        helper.setUp();
    }

    @Override
    protected void after() {
        helper.tearDown();
    }
}
