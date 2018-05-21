package de.amos.mamb.persistence.restApi;

import de.amos.mamb.model.Employee;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.persistence.util.TestBase;
import de.amos.mamb.rest.EmployeeAPI;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.factory;

/**
 * Tests für die EmployeeAPI
 */

public class EmployeeApiTest extends TestBase {

    private PersistenceManager manager;
    private EmployeeAPI employeeAPI;
    private Employee employee;
    private Employee employee1;
    private Employee employee2;

    @BeforeEach
    public void setUp() {
        factory().register(Employee.class);

        manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

        employeeAPI = new EmployeeAPI();

        ArrayList<String> list = new ArrayList<>();
        list.add("test");
        list.add("test2");

        employee = new Employee("Hans", "Mustermann", 18, list);
        employee1 = new Employee("Peter", "Petermuster", 20, list);
        employee2 = new Employee("Max", "Maxmuster", 21, list);
    }

    /**
     * Speichern mehrerer Mitarbeiter Objekte durch die API
     * Laden aller Mitarbeiter Objekte durch die API
     *
     */


    @Test
    public void saveGetEmployeeTest(){

        employeeAPI.saveEmployee(employee);
        employeeAPI.saveEmployee(employee1);
        employeeAPI.saveEmployee(employee2);
        Employee getEmployee = null;
        List<Employee> list = manager.getAllEntities(Employee.class);
        for(Employee e: list ){
            if(e.getLastName().equals(employee.getLastName())){
                getEmployee = e;
            }
        }
        assertNotNull(getEmployee);
        assertEquals(employee, getEmployee);
    }
}
