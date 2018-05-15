package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Material extends PersistentObject{

    @Index
    int oldId;
    String name;
    String description;
    String location;

    public Material(){

    }

    public Material(int id, String name, String description, String location){
        this.oldId = id;
        this.name = name;
        this.description = description;
        this.location = location;
    }

    public int getOldId() {
        return oldId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public void setOldId(int oldId) {
        this.oldId = oldId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
