/* @Authors George Kokolakis (gkokol@ics.forth.gr) */
"use strict";

let isPopoverEnabled = false
let lat = null
let lon = null
function check_if_passwords_equal() {
    var pswd = $("#pswd").val();

    var repswd = $("#re-pswd").val();
    if (pswd !== repswd) {
        console.log("not equals")

        isPopoverEnabled = true
        $('#pswd').popover({
            content: "passwords doesn't match",
            placement: 'left'
        })
                .popover('show');

    } else {
        if (isPopoverEnabled) {
            $("#pswd").popover('hide')
            isPopoverEnabled = false
            console.log(" equals")
        }

    }
}

function handle_pswd_visibility() {

    var pswd = document.getElementById("pswd")
    var re_pswd = document.getElementById("re-pswd")


    if ($("#check-show-pswd").is(':checked')) {
        pswd.type = "text"
        re_pswd.type = "text"

    } else {
        pswd.type = "password"
        re_pswd.type = "password"



    }

}
function check_if_password_is_50_percent_or_higher_with_numbers(password) {
    var pwd_length = password.length
    var count_numbers = 0
    for (var i in password) {
        if (!isNaN(password[i])) {
            count_numbers++;
        }
    }
    if (count_numbers >= (pwd_length) / 2) {
        document.getElementById("pswd-strength").innerHTML = "weak password"
        return true


    }
    return false
}
function characters_frequency(password) {
    var ch_freq = {}
    for (var i in password) {
        if (ch_freq[password[i]] == undefined) {
            ch_freq[password[i]] = 1

        } else {
            ch_freq[password[i]]++;

        }
    }
    return ch_freq
}
function check_if_a_character_shows_up_more_than_50_percent(password) {
    var pwd_length = password.length
    var ch_freq = characters_frequency(password)
    for (var key in ch_freq) {
        if (ch_freq[key] >= (pwd_length / 2)) {
            document.getElementById("pswd-strength").innerHTML = "weak password"
            return true

        }
    }
    return false

}
function count_unique_characters(ch_freq) {
    return Object.keys(ch_freq).length
}
function check_if_password_80_percent_of_characters_are_different(password) {
    var ch_freq = characters_frequency(password)
    var unique_ch = count_unique_characters(ch_freq)


    if (unique_ch / password.length >= 0.8) {
        document.getElementById("pswd-strength").innerHTML = "Strong password"
        return true
    }
    return false

}
function check_password_strength() {
    var pswd = document.getElementById("pswd").value
    if (pswd.length == 0)
        return
    document.getElementById("pswd-strength").classList.remove("d-none")

    if (check_if_password_is_50_percent_or_higher_with_numbers(pswd)) {
    } else if (check_if_a_character_shows_up_more_than_50_percent(pswd)) {
    } else if (check_if_password_80_percent_of_characters_are_different(pswd)) {
    } else {
        document.getElementById("pswd-strength").innerHTML = "medium password"
    }
}
function handle_doctor_radio_button() {
    if ($('#doctor-radio').is(':checked')) {
        document.getElementById("doctor-extra").classList.remove("d-none")
        document.getElementById("address").placeholder = "Enter Doctor Address"
    } else {
        document.getElementById("doctor-extra").classList.add("d-none")
        document.getElementById("address").placeholder = "Enter Address"

    }
}
function on_change() {
    var amka = document.getElementById("amka").value
    var birth_date = document.getElementById("birth-date").value
    check_amka(amka, birth_date)
    check_password_strength()
    check_if_passwords_equal();

}


function check_amka(amka, date) {
    if (amka.length == 0) {
        return
    }
    var tmp_date = [];
    date = date.split('-').join('') //cut the - 
    var x;
    for (i = 0; i < date.length; i = i + 2) {

        x = date[i]
        tmp_date[i] = date[i + 1]
        tmp_date[i + 1] = x
    }
    date = tmp_date.reverse()

    for (var i = 0; i < 6; i++) {
        if (amka[i] != date[i]) {
            console.log("wrong amka")
            //$("#submit-button").prop("disabled", true);
            return
        }
    }
    // $("#submit-button").removeAttr('disabled');
    console.log("valid amka")

}
let blood_type = null

$(document).ready(function () {

    $("input").change(on_change);
    $("#username").change(check_if_username_exists);

    $("#check-show-pswd").click(handle_pswd_visibility);
    $("input[name=type-of-user-radio]").click(handle_doctor_radio_button);


})
function callback_register(response)
{
    console.log(response)
}
let url = "http://localhost:8080/Hospital_System/"

function send_form_to_server() {
    var speciality = null;
    var doctor_info = null;
    var register_url = url + "register"
    if ($('#doctor-radio').is(':checked')) {
        speciality = $("#dc-speciality").val()
        doctor_info = $("#doctor-text-area").val()

    }
    var gender
    if ($('#man').is(':checked')) {
        gender = "male"
    } else {
        gender = "female"
    }
    var blood_donor
    if ($('#blood-giver').is(':checked')) {
        blood_donor = 1
    } else {
        blood_donor = 0
    }

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
        lat: 1,
        lon: 2,
        telephone: $("#telephone").val(),
        height: $("#height").val(),
        weight: $("#weight").val(),
        blooddonor: blood_donor,
        bloodtype: $("#blood-type").val(),
        specialty: speciality,
        doctor_info: doctor_info

    };
    console.log(data)
    sendXmlPostRequest(register_url, data, callback_register);
    return false

}

function check_if_username_exists()
{
    var check_username_url = url + "check_username"
    var user_name = $("#username").val()
    var data = {username: user_name}
    console.log(data)
    sendXmlPostRequest(check_username_url, data, call_back_check_username);
}
function call_back_check_username(response)
{
    console.log(response)
}