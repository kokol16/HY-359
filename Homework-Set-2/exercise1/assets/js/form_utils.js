/* @Authors George Kokolakis (gkokol@ics.forth.gr) */



function check_if_passwords_equal() {
    pswd = $("#pswd").val();
    repswd = $("#re-pswd").val();
    if (pswd !== repswd) {
        $("#pswd").popover({ placement: "left", content: "passwords doesn't match" })
        $("#pswd").popover('enable')
        $("#pswd").popover('show')

    }
    else {
        $("#pswd").popover('disable')
        $("#pswd").popover('hide')

    }
}

function handle_pswd_visibility() {

    pswd = document.getElementById("pswd")

    if ($("#check-show-pswd").is(':checked')) {
        pswd.type = "text"
    }
    else {
        pswd.type = "password"


    }

}
function check_if_password_is_50_percent_or_higher_with_numbers(password) {
    pwd_length = password.length
    count_numbers = 0
    for (var i in password) {
        if (!isNaN(password[i])) {
            count_numbers++;
        }
    }
    if (count_numbers > (pwd_length) / 2) {
        document.getElementById("pswd-strength").innerHTML = "weak password"
        return true


    }
    return false
}
function characters_frequency(password) {
    ch_freq = {}
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
    pwd_length = password.length
    ch_freq = characters_frequency(password)
    for (var key in ch_freq) {
        if (ch_freq[key] > (pwd_length / 2)) {
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
    ch_freq = characters_frequency(password)
    unique_ch = count_unique_characters(ch_freq)


    if (unique_ch / password.length >= 0.8) {
        document.getElementById("pswd-strength").innerHTML = "Strong password"
        return true
    }
    return false

}
function check_password_strength() {
    pswd = document.getElementById("pswd").value
    if (pswd.length == 0) return
    document.getElementById("pswd-strength").classList.remove("d-none")

    if (check_if_password_is_50_percent_or_higher_with_numbers(pswd)) { }
    else if (check_if_a_character_shows_up_more_than_50_percent(pswd)) { }
    else if (check_if_password_80_percent_of_characters_are_different(pswd)) { }
    else { document.getElementById("pswd-strength").innerHTML = "medium password" }
}
function handle_doctor_radio_button()
{
    if($('#doctor-radio').is(':checked')) 
    {
        document.getElementById("doctor-extra").classList.remove("d-none")
        document.getElementById("address").placeholder="Enter Doctor Address"
    }
    else
    {
        document.getElementById("doctor-extra").classList.add("d-none")
        document.getElementById("address").placeholder="Enter Address"

    }
}
function check_amka(amka)
{

}
$(document).ready(function () {


    $("input").blur(check_if_passwords_equal);
    $("input").change(check_password_strength);
    $("#check-show-pswd").click(handle_pswd_visibility);
    $("input[name=type-of-user-radio]").click(handle_doctor_radio_button);
 

})

