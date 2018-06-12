package de.amos.mamb.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Test für das Model Construction Area
 */
public class ConstructionAreaTest {

    private ConstructionArea construction;
    private ConstructionArea construction1;
    private ConstructionArea construction2;
    private Material material;
    private Vehicle vehicle;
    private Employee employee;

    @BeforeEach
    public void setUp(){
        construction = new ConstructionArea("Neustadt",
                "2018-06-09",
                "2018-06-11",
                new ConstructionLadder("Max","Test"),
                false,
                new HashMap<String, ConstructionAreaDay>());
        construction1 = new ConstructionArea("Nürnberg",
                "2010-06-01",
                "2010-06-08",
                new ConstructionLadder("Test","Test"),
                true,
                new HashMap<String, ConstructionAreaDay>());
        construction2 = new ConstructionArea("Herzogenaurach",
                "2018-01-03",
                "2018-01-20",
                new ConstructionLadder("Test","Test"),
                false,
                new HashMap<String, ConstructionAreaDay>());

        vehicle = new Vehicle("BMW", "Test", "M3");
        material = new Material("Farbe", "Blau", "Test");

        List<String> skills = new ArrayList<>();
        skills.add("oneSkill");
        employee = new Employee("dummy", "dummy", 2, skills);
    }

    @Test
    public void setDaysTest(){
        construction.setDays(new HashMap<String, ConstructionAreaDay>());
        construction1.setDays(new HashMap<String, ConstructionAreaDay>());
        construction2.setDays(new HashMap<String, ConstructionAreaDay>());

        assertEquals(3, construction.getDays().keySet().size());
        assertEquals(8, construction1.getDays().keySet().size());
        assertEquals(18, construction2.getDays().keySet().size());
    }

    @Test
    public void addResourceToEveryDayTest(){
        construction.addResourceToEveryDay(vehicle);
        construction2.addResourceToEveryDay(material);
        construction2.addResourceToEveryDay(vehicle);

        for(String key : construction.getDays().keySet()){
            assertTrue(construction.getDays().get(key).getVehicleList().contains(vehicle));
        }

        for(String key : construction2.getDays().keySet()){
            assertTrue(construction2.getDays().get(key).getVehicleList().contains(vehicle));
            assertTrue(construction2.getDays().get(key).getMaterialList().contains(material));
        }
    }

    @Test
    public void addResourceToDayTest(){
        construction1.addResourceToDay(vehicle, "2010-06-02");
        construction2.addResourceToDay(material, "2018-01-20");
        construction.addResourceToDay(employee, "2018-06-09");

        assertTrue(construction.days.get("2018-06-09").employeeList.contains(employee));
        assertTrue(construction1.days.get("2010-06-02").vehicleList.contains(vehicle));
        assertTrue(construction2.days.get("2018-01-20").materialList.contains(material));
    }

    @Test
    public void removeResourceToEveryDayTest(){
        construction.addResourceToEveryDay(vehicle);
        construction2.addResourceToEveryDay(material);
        construction2.addResourceToEveryDay(vehicle);

        for(String key : construction.getDays().keySet()){
            assertTrue(construction.getDays().get(key).getVehicleList().contains(vehicle));
        }

        for(String key : construction2.getDays().keySet()){
            assertTrue(construction2.getDays().get(key).getVehicleList().contains(vehicle));
            assertTrue(construction2.getDays().get(key).getMaterialList().contains(material));
        }

        construction.removeResourceToEveryDay(vehicle);
        construction2.removeResourceToEveryDay(material);
        construction2.removeResourceToEveryDay(vehicle);

        for(String key : construction.getDays().keySet()){
            assertFalse(construction.getDays().get(key).getVehicleList().contains(vehicle));
        }

        for(String key : construction2.getDays().keySet()){
            assertFalse(construction2.getDays().get(key).getVehicleList().contains(vehicle));
            assertFalse(construction2.getDays().get(key).getMaterialList().contains(material));
        }
    }

    @Test
    public void removeResourceToDayTest(){
        construction1.addResourceToDay(vehicle, "2010-06-02");
        construction2.addResourceToDay(material, "2018-01-20");
        construction.addResourceToDay(employee, "2018-06-09");

        assertTrue(construction.days.get("2018-06-09").employeeList.contains(employee));
        assertTrue(construction1.days.get("2010-06-02").vehicleList.contains(vehicle));
        assertTrue(construction2.days.get("2018-01-20").materialList.contains(material));

        construction1.removeResourceToDay(vehicle, "2010-06-02");
        construction2.removeResourceToDay(material, "2018-01-20");
        construction.removeResourceToDay(employee, "2018-06-09");

        assertFalse(construction.days.get("2018-06-09").employeeList.contains(employee));
        assertFalse(construction1.days.get("2010-06-02").vehicleList.contains(vehicle));
        assertFalse(construction2.days.get("2018-01-20").materialList.contains(material));
    }
}
