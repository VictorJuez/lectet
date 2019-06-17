$(document).ready(() => {

    $('#reused_form input[type=text]').on('change invalid', function() {
        var campotexto = $(this).get(0);
    
        campotexto.setCustomValidity('');
    
        if (!campotexto.validity.valid) {
          campotexto.setCustomValidity('Fulfill this field!');  
        }
    });

});