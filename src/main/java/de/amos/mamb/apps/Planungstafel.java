package de.amos.mamb.apps;

import com.googlecode.objectify.ObjectifyService;
import de.amos.mamb.model.Employee;
import de.amos.mamb.model.User;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class Planungstafel implements ServletContextListener {


    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {

        ObjectifyService.init();
        ObjectifyService.register(User.class);
        ObjectifyService.register(Employee.class);
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
