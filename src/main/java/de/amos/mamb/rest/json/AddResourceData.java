package de.amos.mamb.rest.json;

import de.amos.mamb.model.Employee;
import de.amos.mamb.model.Material;
import de.amos.mamb.model.Vehicle;

public class AddResourceData {

    String day;
    Employee employee;
    Vehicle vehicle;
    Material material;
    boolean permanent;

    public AddResourceData() {
    }

    public AddResourceData(String day, Employee employee, Vehicle vehicle, Material material, boolean permanent) {
        this.day = day;
        this.employee = employee;
        this.vehicle = vehicle;
        this.material = material;
        this.permanent = permanent;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }

    public boolean isPermanent() {
        return permanent;
    }

    public void setPermanent(boolean permanent) {
        this.permanent = permanent;
    }
}
