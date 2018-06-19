package de.amos.mamb.model;

import com.google.common.io.ByteStreams;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Ignore;
import com.googlecode.objectify.annotation.Index;

import java.io.IOException;
import java.io.InputStream;

/**
 * Wrapper model for a file to be stored in the google datastore
 */
@Entity
public class FileWrapper extends PersistentObject{

    @Ignore
    public final int maxSize = 1024 * 1024;

    @Index
    String constructionAreaId;
    String name;
    String date;
    byte[] fileData;

    public FileWrapper(){}

    public FileWrapper(String constructionAreaId, String name, String date, byte[] fileData) {
        this.constructionAreaId = constructionAreaId;
        this.name = name;
        this.date = date;
        this.fileData = fileData;
    }

    public FileWrapper(String constructionAreaId, String name, String date, InputStream stream) throws IOException {
        this.constructionAreaId = constructionAreaId;
        this.name = name;
        this.date = date;
        readData(stream);
    }

    public String getConstructionAreaId() {
        return constructionAreaId;
    }

    public void setConstructionAreaId(String constructionAreaId) {
        this.constructionAreaId = constructionAreaId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public byte[] getFileData() {
        return fileData;
    }

    public void setFileData(byte[] fileData) throws ArrayIndexOutOfBoundsException {

        if(fileData.length >= maxSize){
            throw new ArrayIndexOutOfBoundsException("File size bigger than 1MB!");
        } else {
            this.fileData = fileData;
        }
    }

    public void readData(InputStream stream) throws IOException {

        byte[] bytes =  ByteStreams.toByteArray(stream);
        setFileData(bytes);
    }
}
