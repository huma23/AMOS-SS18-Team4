package de.amos.mamb.persistence.restApi;

import de.amos.mamb.model.ConstructionLadder;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.persistence.util.TestBase;

import de.amos.mamb.rest.ConstructionLadderAPI;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.googlecode.objectify.ObjectifyService.factory;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Tests für die ConstructionLadderAPI
 */


public class ConstructionLadderApiTest extends TestBase {
    private PersistenceManager manager;
    private ConstructionLadderAPI constructionAreaAPI;
    private ConstructionLadder ladder;
    private ConstructionLadder ladder1;
    private ConstructionLadder ladder2;

    @BeforeEach
    public void setUp() {
        factory().register(ConstructionLadder.class);

        manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

        constructionAreaAPI = new ConstructionLadderAPI();


        ladder = new ConstructionLadder("Max", "Leiter1");
        ladder1 = new ConstructionLadder("Muster", "Leiter2");
        ladder2 = new ConstructionLadder("Mister", "Leiter3");
    }

    /**
     * Speichern mehrerer Bauleiter Objekte durch die API
     * Laden aller Bauleiter Objekte durch die API
     *
     */
    @Test
    public void saveGetConstructionAreaTest(){

        constructionAreaAPI.saveConstructionLadder(ladder);
        constructionAreaAPI.saveConstructionLadder(ladder1);
        constructionAreaAPI.saveConstructionLadder(ladder2);
        ConstructionLadder getLadder = null;
        List<ConstructionLadder> list = manager.getAllEntities(ConstructionLadder.class);
        for(ConstructionLadder c: list ){
            if(c.getLastName().equals(ladder.getLastName())){
                getLadder = c;
            }
        }
        assertNotNull(getLadder);
        assertEquals(ladder, getLadder);
    }
}
