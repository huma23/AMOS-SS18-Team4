package de.amos.mamb.model;

public class Reservation {

    Long resourceId;
    String startTime;
    String endTime;

    public Reservation(){

    }

    public Reservation(Long resourceId, String startTime, String endTime) {
        this.resourceId = resourceId;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
