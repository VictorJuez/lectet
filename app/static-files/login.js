$(document).ready(() => {
    console.log("HELLO WORLD");
    const userkey = JSON.parse(window.localStorage.getItem("lectet"));
    
    if(userkey) console.log("myKey: "+userkey);
    var $button = $('#loginButton');
    $button.click(function(){
        const $email = $('#email').val();
        const $password = $('#password').val();
        console.log("email: "+ $email);
        console.log("password: "+ $password);

        var check = $.ajax({
            url: 'https://lectet.herokuapp.com/api/user/signIn',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "email": $email,
                "password": $password
            }),
            success: function (response) {
                if(response == null) console.log("empty response");
                else console.log(response.token);
                window.localStorage.setItem("lectet", JSON.stringify({
                    "email": $email,
                    "token": response.token
                }));
                window.location.href = "index.html";
            },
            error: function () {
                console.log("No se ha podido obtener la información");
            }
        });
        console.log(check);
    });
});

/*
save data to localstorage:      window.localStorage.setItem(key, value);
load data from localstorage:    window.localStorage.getItem(key);
*/