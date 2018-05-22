package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;

@Entity
public class ConstructionArea extends PersistentObject{

    @Index
    String name;
    String startDate;
    String endDate;
    ConstructionLadder bauleiter;
    boolean permanent;

    public ConstructionArea(){

    }

    public ConstructionArea(String name, String startDate, String endDate, ConstructionLadder bauleiter, boolean permanent){
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.bauleiter = bauleiter;
        this.permanent = permanent;
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

}
