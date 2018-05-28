package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;

import java.util.List;

@Entity
public class ConstructionArea extends PersistentObject{

    @Index
    String name;
    @Index
    String startDate;
    @Index
    String endDate;
    ConstructionLadder bauleiter;
    @Index
    boolean permanent;
    List<Employee> employees;

    public ConstructionArea(){

    }

    public ConstructionArea(String name, String startDate, String endDate, ConstructionLadder bauleiter, boolean permanent, List<Employee> employees){
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.bauleiter = bauleiter;
        this.permanent = permanent;
        this.employees = employees;
    }

    public String getName() {
        return name;
    }

    public String getStartDate() {
        return startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public ConstructionLadder getBauleiter() {
        return bauleiter;
    }

    public void setBauleiter(ConstructionLadder bauleiter) {
        this.bauleiter = bauleiter;
    }

    public boolean getPermanent() {return permanent;}

    public void setPermanent(boolean permanent) {this.permanent = permanent; }

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }
}
