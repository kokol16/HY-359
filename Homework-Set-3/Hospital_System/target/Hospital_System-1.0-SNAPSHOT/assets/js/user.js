
function update_data() {

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
        telephone: $("#telephone").val(),
        height: $("#height").val(),
        weight: $("#weight").val(),
        blooddonor: blood_donor,
        bloodtype: $("#blood-type").val(),

    };
    sendXmlPostRequest(register_url, data, callback_register, call_back_error_register);
    return false
}

function fill_user_info(responseData) {
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
    telephone: $("#telephone").val(),
    height: $("#height").val(),
    weight: $("#weight").val(),
    blooddonor: blood_donor,
    bloodtype: $("#blood-type").val()
}
function get_data() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            fill_user_info(responseData)
        } else if (xhr.status !== 200) {
        }
    };
    xhr.open('GET', 'user?type=user_info');
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send();
}
$(document).ready(function () {
    get_data();
});