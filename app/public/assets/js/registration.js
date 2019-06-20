$(document).ready(() => {
    const userkey = JSON.parse(window.localStorage.getItem("lectet"));

    if (userkey) {
        $.ajax({
            url: 'https://lectet.herokuapp.com/backend/user/info',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", userkey.token);
            },
            success: function (response) {
                window.location.href = "../index.html";
            },
            error: function () {
                console.log("Error while checking logging");
            }
        });
    } else console.log("You are not logged in");

    var $button = $('#registerButton');
    $button.click(function () {
        const $email = $('#email').val();
        const $password = $('#password').val();
        const $confirmPassword = $('#confirm_password').val();
        const $firstName = $('#first_name').val();
        const $secondName = $('#second_name').val();
        const $terms = $('#t_and_c');
        if($firstName == "" || $secondName == "" || $password == "" || $email == "" || $confirmPassword == ""){
            throwError("Please fill all the camps");
            return;
        }
        if(!passwordEquals($password, $confirmPassword)){
            throwError("Passwords are not equals");
            return;
        }
        if($terms.is(":checked")) console.log("Terms and conditions: checked");
        else {
            throwError("You have to accept the terms and conditions");
            return;
        }
        var check = $.ajax({
            url: 'https://lectet.herokuapp.com/backend/user/signUp',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "email": $email,
                "password": $password,
                "name":$firstName,
                "surname":$secondName
            }),
            success: function (response) {
                if (response == null) console.log("empty response");
                else console.log(response.token);
                window.localStorage.setItem("lectet", JSON.stringify({
                    "token": response.token
                }));
                window.location.href = "../index.html";
            },
            error: function (error) {
                if(error.status == 400) throwError(error.responseJSON.details[0].message);
                else if(error.status == 403) throwError(error.responseJSON.error);
                else throwError("Error ocurred");
            }
        });
    });
});

function passwordEquals(password, password2){
    if(password == password2) return true;
    return false;
}

function throwError(message){
    $("#error").css({
        'display': 'block'
    });
    $('#error_text').text(message);
    return;
}

/*
save data to localstorage:      window.localStorage.setItem(key, value);
load data from localstorage:    window.localStorage.getItem(key);
*/