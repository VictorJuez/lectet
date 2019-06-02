$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}
var genre = 0;

$(document).ready(() => {
    console.log("id=" + $.urlParam('id'));
    var $book_title = $('#book_title');
    var $author_name = $('#author_name');
    var $author_name_bottom = $('#author_name_bottom');
    var $book_price = $('#book_price');
    var $book_description = $('#book_description');
    var $book_long_description = $('#book_long_description');
    var $book_image0 = $('#book_image0');
    var $book_image1 = $('#book_image1');
    var $book_image2 = $('#book_image2');

    $book_image0.attr("src", 'images/books/book_' + $.urlParam('id') + '.jpg');
    $book_image1.attr("src", 'images/books/book_' + $.urlParam('id') + '.jpg');
    $book_image2.attr("src", 'images/books/book_' + $.urlParam('id') + '.jpg');
    $.ajax({
        type: 'GET',
        url: 'https://lectet.herokuapp.com/api/books/' + $.urlParam('id'),
        success: function (data) {
            console.log(data);
            $book_title.html('<p>' + data.book.name + '</p>');
            // $author_name.html('<p>' + data.book.authors[0].name + ' ' + data.book.authors[0].lastName + '</p>');
            var authors = '<p>';
            for (var i = 0; i < data.book.authors.length; i++) {
                authors = authors + ' ' + 'Author: <span class="glyphicon glyphicon-user"></span>' +
                    '<a class="nav-link" href="author.html?id=' + data.book.authors[i].id + '" style="color:#aaa">' + data.book.authors[0].name + ' ' + data.book.authors[0].lastName + '</a>'
            }
            authors = authors + '</p>';
            $author_name.html(authors);
            $author_name_bottom.html(authors);
            $book_price.html(data.book.price + '<span class="glyphicon glyphicon-euro"></span>');
            $book_description.html(data.book.description);
            $book_long_description.html(data.book.description);
            genre = data.book.genreId;
            $.ajax({
                type: 'GET',
                url: 'https://lectet.herokuapp.com/api/books/genre/' + genre,
                success: function (data1) {
                    console.log(data1);
                    id = '#related_book';
                    $(id).css({ 'visibility': 'visible' });
                    var related_books = '';
                    for (var i = 0; i < data1.books.length; i++) {

                        // console.log(data.author.books[i].name);
                        related_books = related_books + '<div class="col-lg-4 col-md-6 col-sm-6">' +
                            '<div class="single-related-product d-flex">' +
                            '<a href=""><img src="images/books/book_' + data1.books[i].id + '.jpg' + '" class="fakeimg" alt=""></a>' +
                            ' <div class="text-center">' +
                            '<a href="' + 'product.html?id=' + data1.books[i].id + '" class="title">' + data1.books[i].name + '</a>' +
                            '<div class="price">' +
                            '<h6>' + '$' + data1.books[i].price + '</h6>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                    $(id).html(related_books);
                }
            });
        }
    });
    //console.log(genre);



    $.ajax({
        type: 'GET',
        url: 'https://lectet.herokuapp.com/api/events/book/' + $.urlParam('id'),
        success: function (data2) {
            console.log(data2);
            id = '#event';
            $(id).css({ 'visibility': 'visible' });
            var books_event = '<div class="row">' +
                '<div class="col-md-9 cta-contents">' +
                '<h1 class="cta-title">' + data2.events[0].name + '</h1>' +
                '<div class="cta-desc">' +
                '<p>' + data2.events[0].description + '</p>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-3 cta-button">' +
                '<a href="event.html/' + data2.events[0].id + '" class="btn btn-lg btn-block btn-primary"> To learn more</a>' +
                '</div>' +
                '</div>;';

            $(id).html(books_event);
        }
    });

    document.getElementById("addToCart").onclick = function () {
        addToCart()
    };

    const userkey = JSON.parse(window.localStorage.getItem("lectet"));

    function addToCart() {
        console.log("HE ENTRAOO");
        console.log(userkey.token);
        var $id = $.urlParam('id');

        $.ajax({
            url: 'https://lectet.herokuapp.com/api/cart/',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify([{
                "book": $id,
                "quantity": 1
            }]),
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", userkey.token);
                console.log("DONE IT");
                console.log(this.data);
            },
            success: function (response) {
                console.log("I ADD TO CART");
                console.log(response);
            },
            error: function () {
                console.log("Error while adding");
            }
        });
    }
});