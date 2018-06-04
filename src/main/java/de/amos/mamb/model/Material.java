package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;

import java.util.Objects;

@Entity
public class Material extends PersistentObject{

    @Index
    String bezeichnung;
    String description;
    String location;

    public Material(){

    }

    public Material( String bezeichnung, String description, String location){
        this.bezeichnung = bezeichnung;
        this.description = description;
        this.location = location;
    }

    public String getBezeichnung() {
        return bezeichnung;
    }

    public String getDescription() {
        return description;
    }

    public String getLocation() {
        return location;
    }

    public void setBezeichnung(String bezeichnung) {
        this.bezeichnung = bezeichnung;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof Material)) {
            return false;
        }
        Material material = (Material) o;
        return  Objects.equals(bezeichnung, material.bezeichnung);
    }

    @Override
    public int hashCode(){
        return Objects.hash(bezeichnung);
    }
}
