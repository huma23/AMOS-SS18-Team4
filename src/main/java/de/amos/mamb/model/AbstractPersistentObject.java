package de.amos.mamb.model;

import com.googlecode.objectify.annotation.Id;

public abstract class AbstractPersistentObject {

    @Id
    protected Long id;

    public abstract Long getId();
}
