/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function get_user_form_data()
{

    var data = {
        username: $("#username").val(),
        email: $("#email").val(),
        password: $("#pswd").val(),
        firstname: $("#firstname").val(),
        lastname: $("#surname").val(),
        birthdate: $("#birth-date").val(),
        gender: gender,
        amka: $("#amka").val(),
        country: $("#country").val(),
        city: $("#city").val(),
        address: $("#address").val(),
        lat: lat,
        lon: lon,
        telephone: $("#telephone").val(),
        height: $("#height").val(),
        weight: $("#weight").val(),
        blooddonor: blood_donor,
        bloodtype: $("#blood-type").val(),
        specialty: speciality,
        doctor_info: doctor_info

    };
    return data;

}