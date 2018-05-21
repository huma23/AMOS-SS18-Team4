package de.amos.mamb.persistence.restApi;

import de.amos.mamb.model.Vehicle;

import de.amos.mamb.persistence.PersistenceManager;
import de.amos.mamb.persistence.util.TestBase;
import de.amos.mamb.rest.VehicleAPI;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static com.googlecode.objectify.ObjectifyService.factory;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

/**
 * Tests für die VehicleAPI
 */

public class VehicleApiTest extends TestBase {

    private PersistenceManager manager;
    private VehicleAPI vehicleAPI;
    private Vehicle vehicle;
    private Vehicle vehicle1;
    private Vehicle vehicle2;

    @BeforeEach
    public void setUp() {
        factory().register(Vehicle.class);

        manager = PersistenceManager.getInstance(PersistenceManager.ManagerType.OBJECTIFY_MANAGER);

        vehicleAPI = new VehicleAPI();

        vehicle = new Vehicle("VW", "big","modell");
        vehicle1 = new Vehicle("Audi", "big", "modell");
        vehicle2 = new Vehicle("Mercedes", "big","modell");
    }

    /**
     * Speichern mehrerer Fahrzeug Objekte durch die API
     * Laden aller Fahrzeug Objekte durch die API
     *
     */

    @Test
    public void saveGetVehicleTest(){

        vehicleAPI.saveVehicle(vehicle);
        vehicleAPI.saveVehicle(vehicle1);
        vehicleAPI.saveVehicle(vehicle2);
        Vehicle getVehicle = null;
        List<Vehicle> list = manager.getAllEntities(Vehicle.class);
        for(Vehicle v: list ){
            if(v.getBezeichnung().equals(vehicle.getBezeichnung())){
                getVehicle = v;
            }
        }
        assertNotNull(getVehicle);
        assertEquals(vehicle, getVehicle);
    }
}
