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





$(document).ready(function () {


    $("input").blur(check_if_passwords_equal);

})

