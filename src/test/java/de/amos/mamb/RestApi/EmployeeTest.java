package de.amos.mamb.RestApi;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.ObjectifyService;
import com.googlecode.objectify.Work;
import de.amos.mamb.model.Employee;
import de.amos.mamb.persistence.LocalDataStoreTestSetup;
import de.amos.mamb.persistence.ObjectifyTestSetup;
import de.amos.mamb.persistence.OfyService;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.rest.EmployeeAPI;
import org.junit.Assert;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;
import org.junit.rules.RuleChain;
import org.junit.rules.TestRule;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;


public class EmployeeTest {
    @ClassRule
    public static TestRule chain = RuleChain
            .outerRule(new LocalDataStoreTestSetup())
            .around(new ObjectifyTestSetup());


    private PersistenceManager manager;
    private EmployeeAPI employeeAPI;
    private Employee employeeTest1;
    private Employee employeeTest2;
    private ArrayList<String> skills;

    @Before
    public void setUp() {
        manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        employeeAPI = new EmployeeAPI();
        skills = new ArrayList<String>(){{
            add("skill1");
            add("skill2");
        }};
        employeeTest1 = new Employee("Hans", "Mustermann",20, skills);
        employeeTest2 = new Employee("Peter", "Muster", 21, skills);
    }

    @Test
    public void saveEmployeeTest(){
        Response response = employeeAPI.saveEmployee(employeeTest1);
        Assert.assertEquals(201, response.getStatus());
    }

    @Test
    public void saveEmployeeAndGetEmployeesTest(){
        employeeAPI.saveEmployee(employeeTest1);
        List<Employee>employees = ObjectifyService.run(new Work<List<Employee>>() {
            @Override
            public List<Employee> run() {
                return OfyService.ofy().load().type(Employee.class).list();
            }
        });


        Employee found = null;
        for(Employee employee: employees){
            if(employee.getFirstName().equals(employeeTest1.getFirstName())  && employee.getLastName().equals(employeeTest1.getLastName())){
                found = employee;
            }
        }
        Assert.assertTrue(employees.size() != 0);
        Assert.assertNotNull(found);
        Assert.assertEquals(found.getFirstName(), employeeTest1.getFirstName());
        Assert.assertEquals(found.getLastName(), employeeTest1.getLastName());

    }
}
