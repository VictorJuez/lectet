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

    var $author_name = $('#author_name');
    var $long_bio = $('#long_bio');

    $.ajax({
        type: 'GET',
        url: 'https://lectet.herokuapp.com/backend/authors/' + $.urlParam('id'),
        success: function (data) {

            $author_name.html('<h2> ' + data.author.name + " " + data.author.lastName + '</h2>');
            $long_bio.html('<p>' + data.author.description + '</p>');
            $("#author_img").attr("src", "../assets/images/authors/author_" + $.urlParam('id') + ".jpg");

            id = '#related_book';
            $(id).css({ 'visibility': 'visible' });
            var related_books = '';
            for (var i = 0; i < data.author.books.length; i++) {

                // console.log(data.author.books[i].name);
                related_books = related_books + '<div class="col-lg-4 col-md-6 col-sm-6">' +
                    '<div class="single-related-product d-flex">' +
                    '<a href="#"><img src="../assets/images/books/book_'+ data.author.books[i].id +'.jpg" class="fakeimg" alt=""></a>' +
                    ' <div class="text-center">' +
                    '<a href="' + './product.html?id=' + data.author.books[i].id + '" class="title">' + data.author.books[i].name + '</a>' +
                    '<div class="price">' +
                    '<h6>' + data.author.books[i].price + ' €</h6>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            $(id).html(related_books);

        }
    });
});