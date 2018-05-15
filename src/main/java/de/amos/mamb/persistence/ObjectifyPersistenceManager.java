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
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.Work;
import de.amos.mamb.model.PersistentObject;

import java.util.ArrayList;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

public class ObjectifyPersistenceManager extends PersistenceManager {

    protected ObjectifyPersistenceManager(){}

    @Override
    public PersistentObject getEntityWithId(Long id, Class clz) {

        Key key = Key.create(clz, id);

        //Objectify v6
        //PersistentObject result = (PersistentObject) OfyService.ofy().load().key(key).now();

        PersistentObject object = ObjectifyService.run(new Work<PersistentObject>() {

            @Override
            public PersistentObject run() {
                return (PersistentObject) OfyService.ofy().load().key(key).now();
            }
        });

        return object;
    }

    @Override
    public boolean saveObject(PersistentObject object) {

        //Key<PersistentObject> persistentKey = OfyService.ofy().save().entity(object).now();

        Key<PersistentObject> persistentKey = ObjectifyService.run(new Work<Key<PersistentObject>>() {
            @Override
            public Key<PersistentObject> run() {
                return OfyService.ofy().save().entity(object).now();
            }
        });

        if(persistentKey != null)
            return true;
        else
            return false;
    }

    @Override
    public List<PersistentObject> getAllEntities(Class clz) {

        List<PersistentObject> list = ObjectifyService.run(new Work<List<PersistentObject>>() {
            @Override
            public List<PersistentObject> run() {

                List<? extends PersistentObject> list = OfyService.ofy().load().type(clz).list();

                if(list.size() == 0)
                    return new ArrayList<>();

                return (List<PersistentObject>) list;
            }
        });

        return list;
    }

    @Override
    public List<PersistentObject> getEntityWithAttribute(String attribute, Object value, Class clz){

        //List<PersistentObject> list = OfyService.ofy().load().type(clz).filter(attribute, value).list();

        List<PersistentObject> list = ObjectifyService.run(new Work<List<PersistentObject>>() {
            @Override
            public List<PersistentObject> run() {

                List<? extends PersistentObject> list = OfyService.ofy().load().type(clz).filter(attribute, value).list();

                if(list.size() == 0)
                    return new ArrayList<>();

                return (List<PersistentObject>) list;
            }
        });

        return list;
    }
}
