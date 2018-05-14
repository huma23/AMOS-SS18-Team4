package de.amos.mamb.rest;

import de.amos.mamb.model.Employee;
import de.amos.mamb.model.PersistentObject;
import de.amos.mamb.persistence.PersistenceManager;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

import static com.googlecode.objectify.ObjectifyService.ofy;

@Path("employee")
public class EmployeeAPI {



    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Employee> getEmployees(){
        List<Employee> employees = ofy().load().type(Employee.class).list();
        return employees;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveEmployee(Employee employee){
        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        List<PersistentObject> list = manager.getEntityWithAttribute("name",employee.getLastName(), Employee.class);
        if(list.isEmpty()){
            manager.saveObject(employee);
            return Response.status(201).build();
        }
        return Response.status(400).build();
    }
}
