$(document).ready(function () {
    
    var altura = $('#menu-top').offset().top;

    const userkey = JSON.parse(window.localStorage.getItem("lectet"));
    if (userkey) {

        $.ajax({
            url: 'https://lectet.herokuapp.com/backend/user/info',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", userkey.token);
            },
            success: function (response) {
                $user = $('#loggeduser');
                $user.text(response.email);
                $user.removeAttr("href");
                $("#login").css({
                    'display': 'none'
                });
                $("#registration").css({
                    'display': 'none'
                });
                $("#logOut-main").css({
                    'display': ''
                });
            },
            error: function () {
                console.log("Error while checking logging");
            }
        });
    } else {
        console.log("You are not logged in");
        $("#cart").css({
            'display': 'none'
        });
    }

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > altura) {
            $('#menu-top').addClass('menu-fixed');
        } else {
            $('#menu-top').removeClass('menu-fixed');
        }
    });


    $.ajax({
        url: 'https://lectet.herokuapp.com/backend/books/genres',
        success: function (respond) {

            var subMenu = "";
            var subMenu_Index = "";

            for (var x = 0; x < respond.genres.length; x++) {
                subMenu = subMenu + '<li>' +
                    '<a href="./search.html?id=' + respond.genres[x].id + '&selected=genre&name=' + respond.genres[x].description + '&page=1">' + respond.genres[x].description + '</a>' +
                    '</li>';
                subMenu_Index = subMenu_Index + '<li>' +
                    '<a href="./pages/search.html?id=' + respond.genres[x].id + '&selected=genre&name=' + respond.genres[x].description + '&page=1">' + respond.genres[x].description + '</a>' +
                    '</li>';
            }

            $("#category-sub-menu").html(subMenu);
            $("#category-sub-menu-index").html(subMenu_Index);
        },
        error: function () {
            console.log("The information could not be obtained.");
        }
    });

    $.ajax({
        url: 'https://lectet.herokuapp.com/backend/books/themes',
        success: function (respond) {

            var subMenu = "";
            var subMenu_Index = "";

            for (var x = 0; x < respond.themes.length; x++) {
                subMenu = subMenu + '<li>' +
                    '<a href="./search.html?id=' + respond.themes[x].id + '&selected=theme&name=' + respond.themes[x].description + '&page=1">' + respond.themes[x].description + '</a>' +
                    '</li>';
                subMenu_Index = subMenu_Index + '<li>' +
                    '<a href="./pages/search.html?id=' + respond.themes[x].id + '&selected=theme&name=' + respond.themes[x].description + '&page=1">' + respond.themes[x].description + '</a>' +
                    '</li>';
            }

            $("#theme-sub-menu").html(subMenu);
            $("#theme-sub-menu-index").html(subMenu_Index);
        },
        error: function () {
            console.log("The information could not be obtained.");
        }
    });
});

function logOut () {
    window.localStorage.removeItem('lectet');
}

