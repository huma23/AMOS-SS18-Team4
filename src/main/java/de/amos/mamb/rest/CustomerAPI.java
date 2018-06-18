package de.amos.mamb.rest;

import de.amos.mamb.model.Customer;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.rest.command.ObjectCommand;
import de.amos.mamb.rest.command.ResponseCommand;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * REST-Schnittstelle der URL /api/customer/
 */
@Path("customer")
public class CustomerAPI extends AbstractAPI {

    /**
     * Liefert eine Liste aller Kunden zurück.
     *
     *
     * @param response
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Customer> getCustomer(@Context HttpServletResponse response){
        return executeRequest(response,new ObjectCommand<List<Customer>>() {
            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 500;
            }

            @Override
            public List<Customer> execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<Customer> customerList = manager.getAllEntities(Customer.class);
                return customerList;
            }
        });
    }

    /**
     * API Endpoint zum speichern eines Kunden über den PersistentManager
     *
     * @param customer
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveCustomer(Customer customer){
        return executeRequest(new ResponseCommand() {
            @Override
            public int httpOnSuccess() {
                return 201;
            }

            @Override
            public int httpOnCommandFailed() {
                return 400;
            }

            @Override
            public String execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

                manager.saveObject(customer);
                return Result.NO_STRING;
            }
        });
    }
}
