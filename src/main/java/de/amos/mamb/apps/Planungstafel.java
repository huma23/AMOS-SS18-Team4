package de.amos.mamb.apps;

import com.googlecode.objectify.ObjectifyService;
import de.amos.mamb.model.*;
import de.amos.mamb.persistence.PersistenceManager;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Planungstafel implements ServletContextListener {


    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {

        ObjectifyService.init();
        ObjectifyService.register(User.class);
        ObjectifyService.register(Employee.class);
        ObjectifyService.register(Vehicle.class);
        ObjectifyService.register(Material.class);
        ObjectifyService.register(ConstructionArea.class);
        ObjectifyService.register(ConstructionLadder.class);
        ObjectifyService.register(Customer.class);
        ObjectifyService.register(FileWrapper.class);
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
