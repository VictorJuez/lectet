$(document).ready(() => {
    console.log("HELLO WORLD");
    var $button = $('#registerButton');
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
            url: 'http://localhost:3000/api/user/signUp',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "email": "victor@victor.com",
                "password": "lmao"
            }),
            success: function (response) {
                console.log("estamos dentro gente");
                if(response == null) console.log("empty response");
                else console.log(response);
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