$(document).ready(function(){
    var altura = $('#menu-top').offset().top;
    
    const userkey = JSON.parse(window.localStorage.getItem("lectet"));
    if(userkey){
        $user = $('#loggeduser');
        $user.text(userkey.email);
        $user.attr("href", "");
    }
    else console.log("you are not logged in");
    
    $(window).on('scroll', function(){
        if ( $(window).scrollTop() > altura ){
            $('#menu-top').addClass('menu-fixed');
        } else {
            $('#menu-top').removeClass('menu-fixed');
        }
    });
 
});