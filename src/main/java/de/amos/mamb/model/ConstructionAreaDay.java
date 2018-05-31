package de.amos.mamb.model;

import java.util.ArrayList;
import java.util.List;

public class ConstructionAreaDay {

    List<Employee> employeeList;
    List<Material> materialList;
    List<Vehicle> vehicleList;

    public ConstructionAreaDay() {
        this.employeeList = new ArrayList<>();
        this.materialList = new ArrayList<>();
        this.vehicleList = new ArrayList<>();
    }

    public ConstructionAreaDay(List<Employee> employeeList, List<Material> materialList, List<Vehicle> vehicleList) {
        this.employeeList = employeeList;
        this.materialList = materialList;
        this.vehicleList = vehicleList;
    }

    public List<Employee> getEmployeeList() {
        return employeeList;
    }

    public void setEmployeeList(List<Employee> employeeList) {
        this.employeeList = employeeList;
    }

    public List<Material> getMaterialList() {
        return materialList;
    }

    public void setMaterialList(List<Material> materialList) {
        this.materialList = materialList;
    }

    public List<Vehicle> getVehicleList() {
        return vehicleList;
    }

    public void setVehicleList(List<Vehicle> vehicleList) {
        this.vehicleList = vehicleList;
    }
}
