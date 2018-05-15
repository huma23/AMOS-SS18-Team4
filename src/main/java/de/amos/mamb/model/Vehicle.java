package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;


@Entity
public class Vehicle extends PersistentObject{

    @Index
    int oldId;
    String name;
    int size;
    String modell;

    public Vehicle(){

    }

    public Vehicle(int id, String name, int size, String modell){
        this.oldId = id;
        this.name = name;
        this.size = size;
        this.modell = modell;
    }

    public String getName() {
        return name;
    }

    public int getOldId() {
        return oldId;
    }

    public int getSize() {
        return size;
    }

    public String getModell() {
        return modell;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setModell(String modell) {
        this.modell = modell;
    }

    public void setOldId(int oldId) {
        this.oldId = oldId;
    }

    public void setSize(int size) {
        this.size = size;
    }
}
