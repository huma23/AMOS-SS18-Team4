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

    public void addResource(PersistentObject object){

        if(object instanceof Employee){
            employeeList.add((Employee) object);
        }

        if(object instanceof Material){
            materialList.add((Material) object);
        }

        if(object instanceof Vehicle){
            vehicleList.add((Vehicle) object);
        }
    }

    public void removeResource(PersistentObject object){

        if(object instanceof Employee){
            employeeList.remove((Employee) object);
        }

        if(object instanceof Material){
            materialList.remove((Material) object);
        }

        if(object instanceof Vehicle){
            vehicleList.remove((Vehicle) object);
        }
    }
}
