$(document).ready(() => {
    var $body = $('body');

    $('#single-user-btn').click(() => {
        const idUser = $('#id-user').val();
        var userURL = 'users/' + idUser;
    
        $.ajax({
            url: userURL,
            type: 'GET',
            dataType: "json",
            success: function( response ) {
                console.log(response);
                const user = response[0];
                $('#found-user').text('User found:');
                $body.append('<p>name:'+ user.name +' email:'+ user.email+'</p>');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
             }
        });
    });
    
    $('#all-users-btn').click(() => {
        console.log("button clicked!");
        var userURL = 'users/';
    
        $.ajax({
            url: userURL,
            type: 'GET',
            dataType: "json",
            success: function( response ) {
                console.log(response);
                for(var i=0; i<response.length; ++i){
                    var user = response[i];
                    $('#found-user').text('User found:');
                    $body.append('<p>name:'+ user.name +' email:'+ user.email+'</p>');
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
             }
        });
    });
    // define a generic Ajax error handler:
    // http://api.jquery.com/ajaxerror/
    $(document).ajaxError(() => {
      console.log("unknown ajax error!");
    });
  });