package de.amos.mamb.persistence.restApi;


import de.amos.mamb.model.Material;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.persistence.util.TestBase;

import de.amos.mamb.rest.MaterialAPI;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;


import static com.googlecode.objectify.ObjectifyService.factory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Tests für die MaterialAPI
 */

public class MaterialApiTest extends TestBase {


    private PersistenceManager manager;
    private MaterialAPI materialAPI;
    private Material material;
    private Material material1;
    private Material material2;

    @BeforeEach
    public void setUp() {
        factory().register(Material.class);

        manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

        materialAPI = new MaterialAPI();

        ArrayList<String> list = new ArrayList<>();
        list.add("test");
        list.add("test2");

        material = new Material("Farbe","Farbe blau", "Garage");
        material1= new Material("Tapete", "Tapetenfarbe Rot", "Gargage2");
        material2 = new Material("Wand", "Graue Wand", "Garage3");
    }

    /**
     * Speichern mehrerer Betriebsmittel Objekte durch die API
     * Laden aller Betriebsmittel Objekte durch die API
     *
     */


    @Test
    public void saveGetMaterialTest(){

        materialAPI.saveMaterial(material);
        materialAPI.saveMaterial(material1);
        materialAPI.saveMaterial(material2);
        Material getEmployee = null;
        List<Material> list = manager.getAllEntities(Material.class);
        for(Material m: list ){
            if(m.getBezeichnung().equals(material.getBezeichnung())){
                getEmployee = m;
            }
        }
        assertNotNull(getEmployee);
        assertEquals(material, getEmployee);
    }
}
