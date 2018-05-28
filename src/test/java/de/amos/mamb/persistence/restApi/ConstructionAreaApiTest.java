package de.amos.mamb.persistence.restApi;

import de.amos.mamb.model.ConstructionArea;
import de.amos.mamb.model.ConstructionLadder;
import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.persistence.util.TestBase;
import de.amos.mamb.rest.ConstructionAreaAPI;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import javax.ws.rs.core.Response;
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
    private ConstructionArea construction3;

    @BeforeEach
    public void setUp() {
        factory().register(ConstructionArea.class);

        manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

        constructionAreaAPI = new ConstructionAreaAPI();


        construction = new ConstructionArea("Neustadt","2010-06-09T22:00:00.000Z","2018-01-25T23:00:00.000Z", new ConstructionLadder("Max","Test"),true);
        construction1 = new ConstructionArea("Nürnberg","2010-06-01T22:00:00.000Z","2010-06-08T22:00:00.000Z", new ConstructionLadder("Test","Test"),true);
        construction2 = new ConstructionArea("Herzogenaurach","2000-01-03T23:00:00.000Z","2018-05-07T22:00:00.000Z", new ConstructionLadder("Test","Test"), false);
        construction3 = new ConstructionArea("Erlangen", "1999-02-01T23:00:00.000Z", "2017-12-31T23:00:00.000Z", new ConstructionLadder("Test", "Test2"), true);
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

    /**
     * Sichern verschiedener Areas und anschließende Abfrage einer Teilmenge aufgrund der KW und dem Jahr
     */
    @Test
    public void getConstructionAreasFromDateTest(){

        //areas sichern
        PersistenceManager manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);
        manager.saveObject(construction);
        manager.saveObject(construction1);
        manager.saveObject(construction2);
        manager.saveObject(construction3);

        //areas nach kw und jahr abfragen
        List<ConstructionArea> areas = constructionAreaAPI.getConstructionAreasFromDate(null, 2010 , 23);

        //assertions
        assertNotNull(areas);
        assertEquals(2, areas.size());
    }
}
