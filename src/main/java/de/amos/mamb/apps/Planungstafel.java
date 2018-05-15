package de.amos.mamb.apps;

import com.googlecode.objectify.ObjectifyService;
import de.amos.mamb.model.*;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

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
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
