package de.amos.mamb.model;

public class PersistentObject extends AbstractPersistentObject{

    @Override
    public Long getId() {
        return this.id;
    }
}
