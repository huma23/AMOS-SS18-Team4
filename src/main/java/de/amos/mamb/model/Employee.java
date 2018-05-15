package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

import java.util.List;

@Entity
public class Employee extends  PersistentObject{

    @Index
    String firstName;
    String lastName;
    int age;
    List<String> skills;

    public Employee(){

    }

    public Employee(String firstName, String lastName, int age, List<String> skills){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.skills = skills;
    }

    public int getAge() {
        return age;
    }

    public String getFirstName() {
        return firstName;
    }

    public List<String> getSkills() {
        return skills;
    }

    public String getLastName() {
        return lastName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }
}
