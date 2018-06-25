package de.amos.mamb.model;


import com.googlecode.objectify.annotation.Entity;


@Entity
public class Note extends PersistentObject
{
    private String  title;
    private String  message;
    private String  dateNoteCreated;
    private String  creator;


    public Note(){

        title           ="";
        message         ="";
        dateNoteCreated ="";
}
    public Note(String _title, String _message, String _dateNoteCreated, String _creator) throws Exception
    {
        title           = _title;
        message         = _message;
        dateNoteCreated = _dateNoteCreated;
        creator         = _creator;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage(){
        return message;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public String getDateNoteCreated(){
        return dateNoteCreated;
    }

    public void setDateNoteCreated(String dateNoteCreated){
        this.dateNoteCreated = dateNoteCreated;
    }

    public String getCreator(){
        return creator;
    }

    public void setCreator(String creator){
        this.creator = creator;
    }


    public boolean isValid()
    {
        if (this.message == null || this.message.isEmpty())
            return false;

        if (this.creator == null || this.creator.isEmpty())
            return false;

        if (this.title== null )
            return false;

        if (this.dateNoteCreated == null || this.dateNoteCreated.isEmpty())
            return false;

        return true;
    }
}