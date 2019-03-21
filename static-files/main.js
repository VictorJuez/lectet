
function loadData(i) {

    var $body = $('body');
    var $foundUser = $('#found-user');
    var idUser = $('#id-user').val();

    $foundUser.text('User with id: ' + idUser + '-> ');

    var userURL = 'users/' + idUser;
    if(i == 0) userURL = 'users/';

    $.ajax({
        url: userURL,
        type: 'GET',
        dataType: "json",
        success: function( response ) {
            console.log(response);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
         }
    });
    
    /*$.ajax({url: "http://localhost:3000/users/"+idUser, success: function(result){
        //$("#div1").html(result);
        console.log(result);
    }});*/

    return false;
};

$('#all-users-btn').click(loadData(0));

$('#single-user-btn').click(loadData(1));

