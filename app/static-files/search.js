$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}



$(document).ready(() => {
    console.log("id=" + $.urlParam('id'));
    console.log("Name = " + $.urlParam('name'));

    console.log('https://lectet.herokuapp.com/api/books/' + $.urlParam('name') + '/' + $.urlParam('id'))
    $.ajax({
        type: 'GET',
        //url: 'https://lectet.herokuapp.com/api/books/' + $.urlParam('name') + '/' + $.urlParam('id'),
        url: 'https://lectet.herokuapp.com/api/books/' + $.urlParam('name') + '/3',
        success: function (respond) {
            console.log(respond);

        }
    });

});