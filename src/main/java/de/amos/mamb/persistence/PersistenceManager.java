/**
 *  @license
 *
 *
 * Copyright [2018] [(MAMB Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)]

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Copyright (c) 2018 by MAMB (Manuel HUbert, Marcel Werle, Artur Mandybura and Benjamin Stone)
 *
 *
 */

package de.amos.mamb.persistence;

import de.amos.mamb.model.PersistentObject;

import java.util.List;

/**
 * Abstrakte Klasse als Schicht zur Datenbank.
 * Sämtliche Datenbankbefehle werden über diese Klasse gesteuert. Für die spezifische Implementierung einer
 * Datenbankschnittstelle sind Unterklassen von dieser Klasse zu bilden und ein zusätzlicher Managertype
 * innerhalb dieser ist zu definieren.
 */
public abstract class PersistenceManager {

    /**
     * Verschiedene zu instantiierende Managertypen
     */
    public enum ManagerType {
        OBJECTIFY_MANAGER
    }

    /**
     * Singleton pattern: Aufruf über PersistanceManager#getInstance(Managertype)
     */
    protected static PersistenceManager INSTANCE = null;

    protected PersistenceManager(){}

    /**
     * Instanzierungsmethode des Persistenz-Managers.
     * Verfügbare Typen im enum ManagerType abgespeichert.
     * @param type
     * @return
     */
    public static synchronized PersistenceManager getInstance(ManagerType type){
        if(INSTANCE == null){

            switch (type){
                case OBJECTIFY_MANAGER:
                    INSTANCE = new ObjectifyPersistenceManager();
            }
        }

        return  INSTANCE;
    }

    /**
     * Suche ein Objekt mit einer spezifischen ID der Klasse clz in der Datenbank
     * @param id
     * @param clz
     * @param <T>
     * @return Objekt der Klasse clz; Im Fehlerfall null.
     */
    public abstract <T extends  PersistentObject> T getEntityWithId(Long id, Class<T> clz);

    /**
     * Suche nach einer Liste von Objekten mit einem spezifischen Attribut.
     *
     * @param attribute Bsp: "email ==" oder "email !="
     * @param value "test@test.de"
     * @param clz
     * @param <T>
     * @return
     */
    public abstract <T extends PersistentObject> List<T> getEntityWithAttribute(String attribute, Object value, Class<T> clz);

    /**
     * Suche nach einer Liste von Objekten mit zwei spezifischen Attributen
     *
     * @param attribute1
     * @param value1
     * @param attribute2
     * @param value2
     * @param clz
     * @param <T>
     * @return
     */
    public abstract <T extends PersistentObject> List<T> getEntityWithTwoAttributes(String attribute1, Object value1, String attribute2, Object value2, Class<T> clz);

    /**
     * Sicherung eines Objekts der Klasse PersitentObject
     * @param object
     * @param <T>
     * @return true im Erfolgsfall; false im Fehlerfall
     */
    public abstract <T extends PersistentObject> boolean saveObject(T object);

    /**
     * Abfrage nach allen Entities der Klasse clz.
     * @param clz
     * @param <T>
     * @return
     */
    public abstract <T extends PersistentObject> List<T> getAllEntities(Class<T> clz);
}
