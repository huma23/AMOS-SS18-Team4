package de.amos.mamb.model;

import com.google.appengine.api.images.Image;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.Transform;
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
    public final int MAX_SIZE = 1024 * 1024;
    @Ignore
    public final int MAX_IMAGE_WIDTH = 1200;

    @Index
    String constructionAreaId;
    String name;
    String date;
    byte[] fileData;
    @Index
    boolean isImageUpload;

    public FileWrapper(){}

    public FileWrapper(String constructionAreaId, String name, String date, byte[] fileData, boolean isImageUpload) {
        this.constructionAreaId = constructionAreaId;
        this.name = name;
        this.date = date;
        this.fileData = fileData;
        this.isImageUpload = isImageUpload;
    }

    public FileWrapper(String constructionAreaId, String name, String date, InputStream stream, boolean isImageUpload) throws IOException {
        this.constructionAreaId = constructionAreaId;
        this.date = date;
        this.name = name;
        this.isImageUpload = isImageUpload;
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

        if(fileData.length >= MAX_SIZE){
            throw new ArrayIndexOutOfBoundsException("File size bigger than 1MB!");
        } else {
            this.fileData = fileData;
        }
    }

    public void readData(InputStream stream) throws IOException {

        byte[] bytes =  ByteStreams.toByteArray(stream);

        if(isImageUpload){
            //try to resize the image to 800 width
            ImagesService imagesService = ImagesServiceFactory.getImagesService();
            Image image = ImagesServiceFactory.makeImage(bytes);

            if(image.getWidth() >= MAX_IMAGE_WIDTH){
                double scale = (double)MAX_IMAGE_WIDTH/(double)image.getWidth();
                int newHeight = (int)(image.getHeight() * scale);
                Transform resize = ImagesServiceFactory.makeResize(800, newHeight);
                Image resized = imagesService.applyTransform(resize, image);
                bytes = resized.getImageData();
            }
        }

        setFileData(bytes);
    }

    public boolean isImageUpload() {
        return isImageUpload;
    }

    public void setImageUpload(boolean imageUpload) {
        isImageUpload = imageUpload;
    }
}
