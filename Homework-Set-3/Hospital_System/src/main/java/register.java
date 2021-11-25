/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import database.tables.EditDoctorTable;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import database.tables.EditSimpleUserTable;
import java.io.BufferedReader;
import java.util.logging.Level;
import java.util.logging.Logger;
import mainClasses.Utils;

/**
 *
 * @author kokol
 */
public class register extends HttpServlet {

    /**
     *
     * @param request
     * @param response
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        Utils utils = new Utils();
        String json_str = utils.getJSONFromAjax(request.getReader());
        JsonObject user_json = JsonParser.parseString(json_str).getAsJsonObject();
        JsonElement specialty = user_json.get("specialty");
        if (specialty.isJsonNull()) {

            EditSimpleUserTable simple_user_obj = new EditSimpleUserTable();
            try {
                System.out.println(json_str);
                simple_user_obj.addSimpleUserFromJSON(json_str);
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write(json_str);
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(register.class.getName()).log(Level.SEVERE, null, ex);
                response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);

            }
        } else {
            EditDoctorTable doctor_edit_obj = new EditDoctorTable();
            try {
                doctor_edit_obj.addDoctorFromJSON(json_str);
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write(json_str);
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(register.class.getName()).log(Level.SEVERE, null, ex);
                response.setStatus(HttpServletResponse.SC_SERVICE_UNAVAILABLE);

            }
        }

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }
}
