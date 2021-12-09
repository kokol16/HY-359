/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest_api;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditBloodTestTable;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.core.MediaType;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import javax.ws.rs.core.Response;

/**
 * REST Web Service
 *
 * @author kokol
 */
@Path("")

public class Examinations {

    public static final int NO_MEASUREMENTS_FOUND = 2;
    public static final int NEGATIVE_MEASUREMENT = 3;

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of Examinations
     */
    public Examinations() {
    }

    /**
     * Retrieves representation of an instance of rest_api.Examinations
     *
     * @return an instance of java.lang.String
     */
    @GET
    @Path("blood")
    @Produces(MediaType.APPLICATION_JSON)
    public String getJson() {
        //TODO return proper representation object
        return "{xaxa:ok}";
    }

    /**
     * PUT method for updating or creating an instance of Examinations
     *
     * @param content representation for the resource
     */
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public void putJson(String content) {
    }

    @POST
    @Path("/newBloodTest")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewBloodTest(String json) {
        JsonObject jsonObject = new JsonParser().parse(json).getAsJsonObject();
        String date = jsonObject.get("test_date").getAsString();
        boolean isDateFuture = isDateFuture(date, "yyyy-MM-dd");
        Response.Status status;
        String res;
        handle_measurements(jsonObject);
        if (isDateFuture) {
            res = "{error: future date}";
            status = Response.Status.NOT_ACCEPTABLE;
            return Response.status(status).type("application/json").entity(res).build();
        }
        int result = handle_measurements(jsonObject);
        if (result == NO_MEASUREMENTS_FOUND) {
            res = "{error: No measurements found}";
            status = Response.Status.NOT_ACCEPTABLE;
            return Response.status(status).type("application/json").entity(res).build();
        } else if (result == NEGATIVE_MEASUREMENT) {
            res = "{error: Negative measurements found}";
            status = Response.Status.NOT_ACCEPTABLE;
            return Response.status(status).type("application/json").entity(res).build();
        }

        /*
        try {
            EditBloodTestTable blood_test_obj = new EditBloodTestTable();
            blood_test_obj.addBloodTestFromJSON("");
            status = Response.Status.OK;
            res = "{ok: blood test added succesfuly";
            return Response.status(status).type("application/json").entity(res).build();

        } catch (ClassNotFoundException ex) {
            Logger.getLogger(Examinations.class.getName()).log(Level.SEVERE, null, ex);
        }*/
        res = "{response:ok}";
        status = Response.Status.OK;
        return Response.status(status).type("application/json").entity(res).build();

    }

    class found_measurement {

        boolean found_measurement;
    }

    public int handle_measurements(JsonObject json) {
        boolean measur_zero = false;
        found_measurement _found_measurement = new found_measurement();
        if (check_measurement("iron", _found_measurement, json) == NEGATIVE_MEASUREMENT) {
            return NEGATIVE_MEASUREMENT;
        }
        if (check_measurement("vitamin_d3", _found_measurement, json) == NEGATIVE_MEASUREMENT) {
            return NEGATIVE_MEASUREMENT;

        }
        if (check_measurement("vitamin_b12", _found_measurement, json) == NEGATIVE_MEASUREMENT) {
            return NEGATIVE_MEASUREMENT;

        }
        if (check_measurement("cholesterol", _found_measurement, json) == NEGATIVE_MEASUREMENT) {
            return NEGATIVE_MEASUREMENT;

        }
        if (check_measurement("blood_sugar", _found_measurement, json) == NEGATIVE_MEASUREMENT) {
            return NEGATIVE_MEASUREMENT;

        }
        if (!_found_measurement.found_measurement) {
            return NO_MEASUREMENTS_FOUND;
        }
        return 1;

    }

    private int check_measurement(String measurement, found_measurement _found_measurement, JsonObject json) {
        if (json.get(measurement) != null) {
            _found_measurement.found_measurement = true;
            System.out.println("lololol");
            if (json.get(measurement).getAsDouble() < 0) {
                return NEGATIVE_MEASUREMENT;
            }
        }
        return 1;
    }

    public static boolean isDateFuture(final String date, final String dateFormat) {
        LocalDate localDate = LocalDate.now(ZoneId.systemDefault());

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern(dateFormat);
        LocalDate inputDate = LocalDate.parse(date, dtf);

        return inputDate.isAfter(localDate);
    }

}
