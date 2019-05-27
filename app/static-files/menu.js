$(document).ready(function(){
    var altura = $('#menu-top').offset().top;
    
    $(window).on('scroll', function(){
        if ( $(window).scrollTop() > altura ){
            $('#menu-top').addClass('menu-fixed');
        } else {
            $('#menu-top').removeClass('menu-fixed');
        }
    });
 
});