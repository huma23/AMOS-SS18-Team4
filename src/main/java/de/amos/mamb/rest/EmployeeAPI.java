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

package de.amos.mamb.rest;

import de.amos.mamb.model.Employee;

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
 * REST-Schnittstelle der URL /api/employee/
 */
@Path("employee")
public class EmployeeAPI extends AbstractAPI {

    /**
     * Liefert eine Liste aller Mitarbeiter zurück.
     *
     *
     * @param response
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Employee> getEmployees(@Context HttpServletResponse response){
        return executeRequest(response,new ObjectCommand<List<Employee>>() {
            @Override
            public int httpOnSuccess() {
                return 200;
            }

            @Override
            public int httpOnCommandFailed() {
                return 500;
            }

            @Override
            public List<Employee> execute() {
                PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
                List<Employee> employeeList = manager.getAllEntities(Employee.class);
                return employeeList;
            }
        });
    }
    /**
     * API Endpoint zum speichern eines Mitarbeiters über den PersistentManager
     *
     * @param employee
     * @return
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveEmployee(Employee employee){
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

                manager.saveObject(employee);
                return Result.NO_STRING;

            }
        });
    }
}
