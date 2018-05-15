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
import de.amos.mamb.model.Employee;
import de.amos.mamb.model.User;
import de.amos.mamb.persistence.util.TestBase;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static com.googlecode.objectify.ObjectifyService.factory;
import static com.googlecode.objectify.ObjectifyService.ofy;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Test für den ObjectifyPersistenceManager
 */
public class ObjectifyPersistenceManagerTest extends TestBase {

    private PersistenceManager manager;
    private User user1;
    private User user2;
    private Employee employee1;
    private Employee employee2;

    /**
     * Setup:
     * - Registrierung der benötigten Entities
     * - Erstellung der Entities
     */
    @BeforeEach
    public void setUp() {
        factory().register(User.class);
        factory().register(Employee.class);

        manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

        ArrayList<String> list = new ArrayList<>();
        list.add("test");
        list.add("test2");

        user1 = new User("unittest@test.de", "123456");
        user2 = new User("hans@gmail.com", "654321");
        employee1 = new Employee("Hans", "Mustermann", 18, list);
        employee2 = new Employee("Peter","Musterpeter", 25, list);
    }

    /**
     * Test:
     * - Speichere Beispiel-Entities
     * - Versuche gespeicherten Entities wieder zu laden
     */
    @Test
    public void getEntityWithIdTest(){

        Key<User> user1Key = ofy().save().entity(user1).now();
        Key<Employee> employee1Key = ofy().save().entity(employee1).now();

        assertNotNull(manager.getEntityWithId(user1Key.getId(), User.class));
        assertNotNull(manager.getEntityWithId(employee1Key.getId(), Employee.class));
        assertNull(manager.getEntityWithId(1234346L, User.class));
        assertNull(manager.getEntityWithId(1243535L, Employee.class));
    }

    /**
     * Test:
     * - Speichere Objekte
     * - Prüfung, ob Objekte gesichert sind
     */
    @Test
    public void saveObjectTest(){
        assertTrue(manager.saveObject(user2));
        assertTrue(manager.saveObject(user1));
        assertTrue(manager.saveObject(employee1));
        assertTrue(manager.saveObject(employee2));

        Integer userSize = ofy().load().type(User.class).list().size();
        Integer employeeSize = ofy().load().type(Employee.class).list().size();

        assertEquals(2, employeeSize.intValue());
        assertEquals(2, employeeSize.intValue());
    }

    /**
     * Test:
     * - Speichere Entities
     * - Aufruf der Entities anhand von Attributen
     */
    @Test
    public void getEntityWithAttributeTest(){

        ofy().save().entity(user1).now();
        ofy().save().entity(user2).now();

        assertNotEquals(null, manager.getEntityWithAttribute("email ==", "unittest@test.de", User.class));
        assertNotEquals(null, manager.getEntityWithAttribute("email ==", "hans@gmail.com", User.class));
        assertEquals(0, manager.getEntityWithAttribute("email ==", "not@saved.de", User.class).size());
    }


}
