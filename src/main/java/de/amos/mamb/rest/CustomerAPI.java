package de.amos.mamb.rest;

import com.google.gson.Gson;
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
     * @param
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomer(  ){
        return executeRequest(new ResponseCommand() {
            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 500;
            }

            @Override
            public String execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<Customer> customerList = manager.getAllEntities(Customer.class);
                Gson gson = new Gson();
                String json = gson.toJson(customerList);
                return json;
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
    public Response saveCustomer(String customer){
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
                Gson gson = new Gson();
                Customer cust = gson.fromJson(customer, Customer.class);
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

                manager.saveObject(cust);
                return Result.NO_STRING;
            }
        });
    }
}
