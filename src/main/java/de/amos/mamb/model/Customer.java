package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Index;

import java.util.Objects;

@Entity
public class Customer extends PersistentObject{

    @Index
    String firstName;
    @Index
    String lastName;
    @Index
    String street;
    @Index
    int houseNumber;
    @Index
    int postalCode;
    @Index
    String city;
    @Index
    String email;
    @Index
    int phoneNumber;
    @Index
    int mobilePhone;

    public Customer(){

    }

    public Customer(String firstName, String lastName, String street, int houseNumber, int postalCode, String city, String email, int phoneNumber, int mobilePhone){
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.houseNumber = houseNumber;
        this.postalCode = postalCode;
        this.city = city;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.mobilePhone = mobilePhone;

    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getStreet() {
        return street;
    }

    public int getHouseNumber() {
        return houseNumber;
    }


    public int getPostalCode() {
        return postalCode;
    }

    public String getCity() {
        return city;
    }

    public String getEmail() {
        return email;
    }

    public int getMobilePhone() {
        return mobilePhone;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setHouseNumber(int houseNumber) {
        this.houseNumber = houseNumber;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMobilePhone(int mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {

        if (o == this) return true;
        if (!(o instanceof Customer)) {
            return false;
        }
        Customer customer = (Customer) o;
        return  Objects.equals(lastName, customer.lastName) &&
                Objects.equals(firstName, customer.firstName);
    }

    @Override
    public int hashCode(){
        return Objects.hash(lastName,firstName);
    }

}
