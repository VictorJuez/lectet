$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
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

            var search = "#books-search";

            var book_search = '';

            for (var x = 0; x < 5; x++) {

                book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4">' +

                    '<div class="card" style="width: 18rem;">' +
                    '<img src="./images/books/book_' + respond.books[x].id + '.jpg" class="fakeimg" alt="...">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' + respond.books[x].name + '</h5>' +
                    '<p class="card-text">' + respond.books[x].description + '</p>' +
                    '<a href="./product.html?id=' + respond.books[x].id + '" class="btn btn-primary">Go somewhere</a>' +
                    ' </div> ' +
                    '</div>' +

                    '</div>'
            }

            $(search).html(book_search);

        }
    });

});