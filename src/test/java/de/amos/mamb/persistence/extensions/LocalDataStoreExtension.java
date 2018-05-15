package de.amos.mamb.persistence.extensions;

import com.google.cloud.datastore.testing.LocalDatastoreHelper;
import org.junit.jupiter.api.extension.BeforeAllCallback;
import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtensionContext;

/**
 * Junit Jupiter Extension zur Simulation eines lokalen Datastores
 * Orientiert an:
 * https://github.com/objectify/objectify/blob/master/src/test/java/com/googlecode/objectify/test/util/LocalDatastoreExtension.java
 */
public class LocalDataStoreExtension implements BeforeAllCallback, BeforeEachCallback {

    private final double CONSISTENCY = 1.0;

    @Override
    public void beforeAll(ExtensionContext context) throws Exception {

        if (getHelper(context) == null) {
            final LocalDatastoreHelper helper = LocalDatastoreHelper.create(CONSISTENCY);
            context.getRoot().getStore(ExtensionContext.Namespace.GLOBAL).put(LocalDatastoreHelper.class, helper);
            helper.start();
        }
    }

    @Override
    public void beforeEach(ExtensionContext context) throws Exception {

        final LocalDatastoreHelper helper = getHelper(context);
        helper.reset();
    }

    public static LocalDatastoreHelper getHelper(final ExtensionContext context) {
        return context.getRoot().getStore(ExtensionContext.Namespace.GLOBAL).get(LocalDatastoreHelper.class, LocalDatastoreHelper.class);
    }
}
