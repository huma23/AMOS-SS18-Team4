package de.amos.mamb.persistence.restApi;

import de.amos.mamb.model.ConstructionArea;
import de.amos.mamb.model.ConstructionLadder;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.persistence.util.TestBase;
import de.amos.mamb.rest.ConstructionAreaAPI;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static com.googlecode.objectify.ObjectifyService.factory;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

/**
 * Tests für die ConstructionAreaAPI
 */


public class ConstructionAreaApiTest extends TestBase {
    private PersistenceManager manager;
    private ConstructionAreaAPI constructionAreaAPI;
    private ConstructionArea construction;
    private ConstructionArea construction1;
    private ConstructionArea construction2;

    @BeforeEach
    public void setUp() {
        factory().register(ConstructionArea.class);

        manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

        constructionAreaAPI = new ConstructionAreaAPI();


        construction = new ConstructionArea("Neustadt","10.8.2017","10.9.2017", new ConstructionLadder("Max","Test"),true);
        construction1 = new ConstructionArea("Nürnberg","10.8.2017","10.9.2017", new ConstructionLadder("Test","Test"),true);
        construction2 = new ConstructionArea("Herzogenaurach","10.8.2017","10.9.2017", new ConstructionLadder("Test","Test"), false);
    }

    /**
     * Speichern mehrerer Betriebsmittel Objekte durch die API
     * Laden aller Betriebsmittel Objekte durch die API
     *
     */
    @Test
    public void saveGetConstructionAreaTest(){

        constructionAreaAPI.saveConstructionArea(construction);
        constructionAreaAPI.saveConstructionArea(construction1);
        constructionAreaAPI.saveConstructionArea(construction2);
        ConstructionArea getConstructionArea = null;
        List<ConstructionArea> list = manager.getAllEntities(ConstructionArea.class);
        for(ConstructionArea c: list ){
            if(c.getName().equals(construction.getName())){
                getConstructionArea = c;
            }
        }
        assertNotNull(getConstructionArea);
        assertEquals(construction, getConstructionArea);
    }
}
