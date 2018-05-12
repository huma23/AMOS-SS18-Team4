package de.amos.mamb.persistence;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.Work;
import de.amos.mamb.model.Employee;
import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.model.User;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.RuleChain;
import org.junit.rules.TestRule;

import java.util.ArrayList;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;
import static org.junit.Assert.*;

public class ObjectifyPersistenceManagerTest {

    @ClassRule
    public static TestRule chain = RuleChain
            .outerRule(new LocalDataStoreTestSetup())
            .around(new ObjectifyTestSetup());

    private PersistenceManager manager;
    private User user1;
    private User user2;
    private Employee employee1;
    private Employee employee2;

    @Before
    public void setUp() {
        manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

        ArrayList<String> list = new ArrayList<>();
        list.add("test");
        list.add("test2");

        user1 = new User("test@test.de", "123456");
        user2 = new User("hans@gmail.com", "654321");
        employee1 = new Employee(1, "Hans", 18, list);
        employee2 = new Employee(2, "Peter", 25, list);
    }

    @Test
    public void getEntityWithIdTest(){

        Key<User> user1Key = ObjectifyService.run(new Work<Key<User>>() {
            @Override
            public Key<User> run() {
                return OfyService.ofy().save().entity(user1).now();
            }
        });

        Key<Employee> employee1Key = ObjectifyService.run(new Work<Key<Employee>>() {
            @Override
            public Key<Employee> run() {
                return OfyService.ofy().save().entity(employee1).now();
            }
        });

        assertNotNull(manager.getEntityWithId(user1Key.getId(), User.class));
        assertNotNull(manager.getEntityWithId(employee1Key.getId(), Employee.class));
        assertNull(manager.getEntityWithId(1234346L, User.class));
        assertNull(manager.getEntityWithId(1243535L, Employee.class));
    }

    @Test
    public void saveObjectTest(){
        assertTrue(manager.saveObject(user2));
        assertTrue(manager.saveObject(user1));
        assertTrue(manager.saveObject(employee1));
        assertTrue(manager.saveObject(employee2));


        Integer userSize = ObjectifyService.run(new Work<Integer>() {
            @Override
            public Integer run() {
                return OfyService.ofy().load().type(User.class).list().size();
            }
        });

        Integer employeeSize = ObjectifyService.run(new Work<Integer>() {
            @Override
            public Integer run() {
                return OfyService.ofy().load().type(Employee.class).list().size();
            }
        });

        assertEquals(2, employeeSize.intValue());
        assertEquals(2, employeeSize.intValue());
    }

    @Test
    public void getEntityWithAttributeTest(){

        ObjectifyService.run(new Work<Key<User>>() {
            @Override
            public Key<User> run() {
                return OfyService.ofy().save().entity(user1).now();
            }
        });

        ObjectifyService.run(new Work<Key<User>>() {
            @Override
            public Key<User> run() {
                return OfyService.ofy().save().entity(user2).now();
            }
        });

        assertEquals(1, manager.getEntityWithAttribute("email ==", "test@test.de", User.class));
        assertEquals(1, manager.getEntityWithAttribute("email ==", "hans@gmail.com", User.class));
        assertEquals(0, manager.getEntityWithAttribute("email ==", "not@saved.de", User.class));
    }
}
