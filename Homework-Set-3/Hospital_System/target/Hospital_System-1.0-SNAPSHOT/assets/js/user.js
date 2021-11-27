
function update_data() {
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
        email: $("#email").val(),
        password: $("#pswd").val(),
        firstname: $("#firstname").val(),
        lastname: $("#surname").val(),
        birthdate: $("#birth-date").val(),
        gender: gender,
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
    console.log(responseData)

    $("#username").val(responseData.username)
    $("#email").val(responseData.email)
    $("#pswd").val(responseData.password)
    $("#firstname").val(responseData.firstname)
    $("#surname").val(responseData.lastname)
    $("#birth-date").val(responseData.birthdate)
    if (responseData.gender === "Male")
        $("#man").prop("checked", true);
    else
        $("#woman").prop("checked", true);

    if (responseData.blooddonor === "1")
        $("#blood-giver").prop("checked", true);
    else
        $("#no").prop("checked", true);

    $("#birth-date").val(responseData.birthdate)
    $("#amka").val(responseData.amka)
    $("#country").val(responseData.country)
    $("#city").val(responseData.city)
    $("#address").val(responseData.address)
    $("#telephone").val(responseData.telephone)
    $("#height").val(responseData.height)
    $("#weight").val(responseData.weight)
    var select_blood = '#blood-type option[value=\"' + responseData.bloodtype + '\"]'
    console.log(select_blood)
    $(select_blood).attr('selected', 'selected');
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