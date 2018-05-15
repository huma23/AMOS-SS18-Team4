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

import com.googlecode.objectify.Key;
import de.amos.mamb.model.PersistentObject;

import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class ObjectifyPersistenceManager extends PersistenceManager {

    protected ObjectifyPersistenceManager(){}

    @Override
    public PersistentObject getEntityWithId(Long id, Class clz) {

        Key key = Key.create(clz, id);
        PersistentObject result = (PersistentObject) ofy().load().key(key).now();
        return result;
    }

    @Override
    public boolean saveObject(PersistentObject object) {

        Key<PersistentObject> persistentKey = ofy().save().entity(object).now();

        if(persistentKey != null)
            return true;
        else
            return false;
    }


    @Override
    public List<PersistentObject> getAllEntities(Class clz) {

        List<PersistentObject> list = ofy().load().type(clz).list();
        return list;
    }

    @Override
    public List<PersistentObject> getEntityWithAttribute(String attribute, Object value, Class clz){

        List<PersistentObject> list = ofy().load().type(clz).filter(attribute, value).list();
        return list;
    }
}
