package de.amos.mamb.persistence.extensions;

import com.google.cloud.datastore.Datastore;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.util.Closeable;
import org.junit.jupiter.api.extension.AfterEachCallback;
import org.junit.jupiter.api.extension.BeforeEachCallback;
import org.junit.jupiter.api.extension.ExtensionContext;

/**
 * Junit Jupiter Extension zur Interaktion von Objectify mit dem lokalen Datastore
 * Orientiert an:
 * https://github.com/objectify/objectify/blob/master/src/test/java/com/googlecode/objectify/test/util/ObjectifyExtension.java
 */
public class ObjectifyExtension implements BeforeEachCallback, AfterEachCallback {

    private static final ExtensionContext.Namespace NAMESPACE = ExtensionContext.Namespace.create(ObjectifyExtension.class);

    @Override
    public void beforeEach(final ExtensionContext context) throws Exception {
        final Datastore datastore = LocalDataStoreExtension.getHelper(context).getOptions().getService();

        ObjectifyService.init(new ObjectifyFactory(datastore));

        final Closeable rootService = ObjectifyService.begin();

        context.getStore(NAMESPACE).put(Closeable.class, rootService);
    }

    @Override
    public void afterEach(final ExtensionContext context) throws Exception {
        final Closeable rootService = context.getStore(NAMESPACE).get(Closeable.class, Closeable.class);

        rootService.close();
    }
}
