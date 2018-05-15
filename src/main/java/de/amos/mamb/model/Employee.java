package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import java.util.List;

@Entity
public class Employee extends  PersistentObject{

    @Index
    int oldId;
    String name;
    int age;
    List<String> skills;

    public Employee(){

    }

    public Employee(int id, String name, int age, List<String> skills){
        this.oldId = id;
        this.name = name;
        this.age = age;
        this.skills = skills;
    }

    public int getAge() {
        return age;
    }

    public int getoldId() {
        return oldId;
    }

    public List<String> getSkills() {
        return skills;
    }

    public String getName() {
        return name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setoldId(int id) {
        this.oldId = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}
