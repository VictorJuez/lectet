$(document).ready(() => {
    console.log("HELLO WORLD");
    const userkey = JSON.parse(window.localStorage.getItem("lectet"));

    if (userkey){
        window.location.href = "../index.html";
    }
    var $button = $('#loginButton');

    $button.click(function () {
        const $email = $('#email').val();
        const $password = $('#password').val();

        var check = $.ajax({
            url: 'https://lectet.herokuapp.com/backend/user/signIn',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "email": $email,
                "password": $password
            }),
            success: function (response) {
                if (response == null) console.log("empty response");
                else console.log(response.token);
                window.localStorage.setItem("lectet", JSON.stringify({
                    "token": response.token
                }));
                window.location.href = "../index.html";
            },
            error: function () {
                $("#error").css({
                    'display': 'block'
                });
                console.log("The information could not be obtained.");
            }
        });
    });
});

/*
save data to localstorage:      window.localStorage.setItem(key, value);
load data from localstorage:    window.localStorage.getItem(key);
*/