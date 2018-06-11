package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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
    Map<String, ConstructionAreaDay> days;

    public ConstructionArea(){
        this.days = new HashMap<>();
    }

    public ConstructionArea(String name, String startDate, String endDate, ConstructionLadder bauleiter, boolean permanent, Map<String, ConstructionAreaDay> map){
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.bauleiter = bauleiter;
        this.permanent = permanent;
        setDays(map);
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

    public Map<String, ConstructionAreaDay> getDays() {
        return days;
    }

    public void setDays(Map<String, ConstructionAreaDay> map) {

        this.days = map;

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        try {
            Date startD = formatter.parse(this.startDate);
            Date endD = formatter.parse(this.endDate);

            Calendar start = Calendar.getInstance();
            start.setTime(startD);
            Calendar end = Calendar.getInstance();
            end.setTime(endD);
            end.add(Calendar.DATE, 1);

            for(Date date = start.getTime(); start.before(end); start.add(Calendar.DATE, 1), date = start.getTime()){
                String key = formatter.format(date);
                if(!days.containsKey(key)){
                    days.put(key, new ConstructionAreaDay());
                }
            }

        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public void addResourceToEveryDay(PersistentObject object){

        for(String key : days.keySet()){
            days.get(key).addResource(object);
        }
    }

    public void addResourceToDay(PersistentObject object, String day){

        if(days.keySet().contains(day)){
            days.get(day).addResource(object);
        }
    }

    public void removeResourceToEveryDay(PersistentObject object){

        for(String key : days.keySet()){
            days.get(key).removeResource(object);
        }
    }

    public void removeResourceToDay(PersistentObject object, String day){

        if(days.keySet().contains(day)){
            days.get(day).removeResource(object);
        }
    }
}
