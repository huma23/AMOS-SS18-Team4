/**
 *  @license
 *
 *
 * Copyright [2018] [(MAMB Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)]

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright (c) 2018 by MAMB (Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)
 *
 *
 */
package de.amos.mamb.persistence;

import com.google.cloud.datastore.StructuredQuery;
import com.googlecode.objectify.Key;
import de.amos.mamb.model.PersistentObject;

import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

/**
 * Konkrete Implementierung eines PersistenceManagers für den Google Datastore gesteuert über
 * das Open-Source Framework Objectify.
 *
 * Instanziierung über PersistenceManager#getInstance(ManagerType.OBJECTIFY_MANAGER)
 */
public class ObjectifyPersistenceManager extends PersistenceManager {

    protected ObjectifyPersistenceManager(){}

    @Override
    public <T extends  PersistentObject> T getEntityWithId(Long id, Class<T> clz) {

        Key key = Key.create(clz, id);
        T result = (T) ofy().load().key(key).now();
        return result;
    }

    @Override
    public <T extends  PersistentObject> boolean saveObject(T object) {

        Key<T> persistentKey = ofy().save().entity(object).now();

        if(persistentKey != null)
            return true;
        else
            return false;
    }

    public <T extends PersistentObject> List<T> getAllEntities(Class<T> clz) {

        List<T> list = ofy().load().type(clz).list();
        return list;
    }

    @Override
    public <T extends PersistentObject> void removeObject(T object) {

        ofy().delete().entity(object).now();
    }

    @Override
    public <T extends PersistentObject> List<T> getEntityWithAttribute(String attribute, Object value, Class<T> clz){

        List<T> list = ofy().load().type(clz).filter(attribute, value).list();
        return list;
    }

    @Override
    public <T extends PersistentObject> List<T> getEntityWithTwoAttributes(String attribute1, Object value1, String attribute2, Object value2, Class<T> clz) {

        List<T> list = ofy().load().type(clz).filter(attribute1, value1).filter(attribute2, value2).list();
        return list;
    }
}
