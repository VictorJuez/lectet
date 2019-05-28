$(document).ready(() => {
    console.log("HELLO WORLD");
    const userkey = window.localStorage.getItem("lectet");
    
    if(userkey) console.log("myKey: "+userkey);
    var $button = $('#loginButton');
    $button.click(function(){
        /*$.ajax({
            url: 'https://lectet.herokuapp.com/api/authors/1',
            success: function (response) {
                console.log(response);
            },
            error: function (){
                console.log("No se ha podido obtener información");
            }
        })*/

        var check = $.ajax({
            url: 'http://localhost:3000/api/user/signIn',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "email": "victor@victor.com",
                "password": "lmao"
            }),
            success: function (response) {
                if(response == null) console.log("empty response");
                else console.log(response.token);
                window.localStorage.setItem("lectet", response.token);
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