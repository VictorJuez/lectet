$(document).ready(() => {
    var $body = $('body');
    var $ul = v$(location).attr('href');

    $.ajax({
        url: 'ul',
        success: function (response) {

        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });
});