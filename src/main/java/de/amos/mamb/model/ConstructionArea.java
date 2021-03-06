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
    @Index
    String strasse;
    @Index
    String ort;
    @Index
    String plz;
    Map<String, ConstructionAreaDay> days;
    Customer customer;
    ArrayList<FileInfo> attachments;
    ArrayList<FileInfo> images;
    String state;
    List<Note> notes;
    @Index
    String progress;

    public ConstructionArea(){

        this.days = new HashMap<>();
        this.attachments = new ArrayList<>();
        this.images = new ArrayList<>(); 
        this.notes  = new ArrayList<Note>();
    }

    public ConstructionArea(String name, String startDate, String endDate, String strasse ,String ort, String plz,
                            ConstructionLadder bauleiter, boolean permanent, Map<String, ConstructionAreaDay> map,
                            Customer customer, String state, ArrayList<FileInfo> attachments, ArrayList<FileInfo> images,
                            List<Note>notes, String progress){
        this.name           = name;
        this.startDate      = startDate;
        this.endDate        = endDate;
        this.bauleiter      = bauleiter;
        this.permanent      = permanent;
        this.customer       = customer;
        this.attachments    = attachments;
        this.images         = images;
        this.strasse        = strasse;
        this.ort            = ort;
        this.plz            = plz;
        this.state          = state;
        this.notes          = notes;
        this.progress       = progress;
        
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
    public String getStrasse(){
        return strasse;
    }
    public String getOrt(){
        return ort;
    }
    public String getPlz(){
        return plz;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setStrasse (String strasse){
        this.strasse = strasse;
    }
    public void setOrt(String ort){
        this.ort = ort;
    }
    public void setPlz(String plz){
        this.plz = plz;
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

    public Customer getCustomer() { return customer; }

    public void setCustomer(Customer customer) { this.customer = customer; }

    public String getState() { return state; }

    public void setState(String state) { this.state = state; }

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

    public ArrayList<FileInfo> getAttachments() {
        return attachments;
    }

    public void setAttachments(ArrayList<FileInfo> attachments) {
        this.attachments = attachments;
    }

    public ArrayList<FileInfo> getImages() {
        return images;
    }

    public void setImages(ArrayList<FileInfo> images) {
        this.images = images;
    }
    public List<Note> getNotes() {
        return notes;
    }

    public void setNotes(List<Note> notes) {
        this.notes = notes;
    }

    public void addNote(Note note)
    {
        this.notes.add(note);
    }
    public void setProgress(String _newValue){
        this.progress = _newValue;
    }
    public String getProgress(){
        return this.progress;
    }

    public List<Reservation> getReservations(String date) {

        if(days.keySet().contains(date)){
            return days.get(date).getReservations();
        }

        return null;
    }

    public void addReservations(String date, Reservation res) {

        if(days.keySet().contains(date)){
            days.get(date).addReservation(res);
        }
    }

    public boolean removeReservation(String date, Long resIdL) {

        if(days.keySet().contains(date)){
            return days.get(date).removeReservation(resIdL);
        } else {
            return false;
        }
    }
}
