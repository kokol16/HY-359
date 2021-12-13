/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.logging.Level;
import java.util.logging.Logger;
import static org.apache.http.HttpHeaders.ACCEPT;
import static org.apache.http.HttpHeaders.CONTENT_TYPE;
import org.apache.http.HttpResponse;
import org.apache.http.ParseException;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

/**
 *
 * @author kokol
 */
public class rest_client {

    private HttpClient client;
    private HttpGet blood_tests;
    private HttpPut bloodTestUpdate;
    private HttpDelete bloodTestDelete;
    private HttpPost addBloodTestService;
    private static final String URL = "http://localhost:8080/PersonalizedHealth";
    private static String serviceName;

    public rest_client() {
        client = HttpClientBuilder.create().build();
    }

    public void delete_blood_test(String id) throws IOException {
        try {
            serviceName = "examinations/bloodTestDeletion";
            bloodTestDelete = new HttpDelete(URL + "/" + serviceName + "/" + id);
            bloodTestDelete.addHeader(ACCEPT, "application/json");
            HttpResponse response = client.execute(bloodTestDelete);
            int responseCode = response.getStatusLine().getStatusCode();
            System.out.println("Response Code " + responseCode);
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(rest_client.class.getName()).log(Level.SEVERE, null, ex);

        }
    }

    public void update_blood_test(String id, String measure, String value) throws IOException {
        try {
            serviceName = "examinations/bloodTest/" + id + "/" + measure + "/" + value;
            bloodTestUpdate = new HttpPut(URL + "/" + serviceName);
            bloodTestUpdate.addHeader(ACCEPT, "application/json");
            HttpResponse response = client.execute(bloodTestUpdate);
            int responseCode = response.getStatusLine().getStatusCode();
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(rest_client.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void getbloodTests(String amka, String from, String to) throws IOException {
        try {
            serviceName = "examinations/bloodTests/" + amka + "?fromDate=" + from + "&toDate=" + to;
            blood_tests = new HttpGet(URL + "/" + serviceName);
            blood_tests.addHeader(ACCEPT, "application/json");
            HttpResponse response = client.execute(blood_tests);
            BufferedReader rd;
            rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(rest_client.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void get_blood_test_measure(String amka, String measure) throws IOException {
        try {
            serviceName = "examinations/bloodTests/" + amka + "/" + measure;
            blood_tests = new HttpGet(URL + "/" + serviceName);
            blood_tests.addHeader(ACCEPT, "application/json");
            HttpResponse response = client.execute(blood_tests);
            BufferedReader rd;
            rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(rest_client.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void add_new_blood_test(String json) throws IOException {
        try {
            serviceName = "examinations/newBloodTest";
            addBloodTestService = new HttpPost(URL + "/" + serviceName);
            System.out.println(addBloodTestService);
            addBloodTestService.addHeader(ACCEPT, "application/json");
            addBloodTestService.addHeader(CONTENT_TYPE, "application/json");
            StringEntity toSend = new StringEntity(json);
            addBloodTestService.setEntity(toSend);

            HttpResponse response = client.execute(addBloodTestService);
            int responseCode = response.getStatusLine().getStatusCode();
            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            String line = "";
            while ((line = rd.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            Logger.getLogger(rest_client.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static void main(String[] args) throws IOException {
        rest_client rs = new rest_client();
        String amka = "03069200000";
        System.out.println("blood tests for amka; " + amka);
        String from = "";
        String to = "";
        rs.getbloodTests(amka, from, to);

        String json = "{\n"
                + " \"amka\":\"01018011111\","
                + " \"test_date\":\"2021-10-11\","
                + " \"medical_center\": \"pagni\","
                + " \"medical_center\": \"100.0\","
                + " \"vitamin_b12\":  \"100.0\""
                + "}";
        System.out.println("insert blood tests " + json);
        rs.add_new_blood_test(json);

        System.out.println("get cholesterol for amka:  " + amka);

        rs.get_blood_test_measure(amka, "cholesterol");

        rs.update_blood_test("1", "cholesterol", "9312");
        rs.delete_blood_test("5");

    }
}
