package de.amos.mamb.persistence.util;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.IncompleteKey;
import com.googlecode.objectify.Key;
import de.amos.mamb.persistence.extensions.LocalDataStoreExtension;
import de.amos.mamb.persistence.extensions.ObjectifyExtension;
import org.junit.jupiter.api.extension.ExtendWith;

import static com.googlecode.objectify.ObjectifyService.factory;
import static com.googlecode.objectify.ObjectifyService.ofy;

/**
 * Test Basis Klasse, die von jeder Objectify Testklasse benötigt wird.
 * Orientiert an:
 * https://github.com/objectify/objectify/blob/master/src/test/java/com/googlecode/objectify/test/util/TestBase.java
 */
@ExtendWith({
        LocalDataStoreExtension.class,
        ObjectifyExtension.class
})
public class TestBase {

    protected Datastore datastore(){
        return factory().datastore();
    }

    protected <E> E saveClearLoad(final E thing) {
        final Key<E> key = ofy().save().entity(thing).now();
        ofy().clear();
        return ofy().load().key(key).now();
    }

    protected FullEntity.Builder<?> makeEntity(final Class<?> kind) {
        return makeEntity(Key.getKind(kind));
    }

    protected FullEntity.Builder<?> makeEntity(final String kind) {
        final IncompleteKey incompleteKey = factory().datastore().newKeyFactory().setKind(kind).newKey();
        return FullEntity.newBuilder(incompleteKey);
    }
}
