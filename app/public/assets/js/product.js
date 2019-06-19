$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
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
    var $book_image0 = $('#book_image0');
    var $book_image1 = $('#book_image1');
    var $book_image2 = $('#book_image2');

    $book_image0.attr("src", '../assets/images/books/book_' + $.urlParam('id') + '.jpg');
    $book_image1.attr("src", '../assets/images/example_page_1.jpg');
    $book_image2.attr("src", '../assets/images/example_page_2.jpg');

    $("#refer-buyNow").attr("href", "./shippment-info.html?direct=yes&id=" + $.urlParam('id'));

    $.ajax({
        type: 'GET',
        url: 'https://lectet.herokuapp.com/backend/books/' + $.urlParam('id'),
        success: function (data) {
            console.log(data);
            $book_title.html('<p>' + data.book.name + '</p>');
            // $author_name.html('<p>' + data.book.authors[0].name + ' ' + data.book.authors[0].lastName + '</p>');
            var authors = '<p>';
            for (var i = 0; i < data.book.authors.length; i++) {
                authors = authors + ' ' + 'Author: <span class="glyphicon glyphicon-user"></span>' +
                    '<a class="nav-link" href="./author.html?id=' + data.book.authors[i].id + '" style="color:#aaa"> ' + data.book.authors[0].name + ' ' + data.book.authors[0].lastName + '</a>'
            }
            authors = authors + '</p>';
            $author_name.html(authors);
            $author_name_bottom.html(authors);
            $book_price.html(data.book.price + '<span class="glyphicon glyphicon-euro"></span>');
            $book_description.html(data.book.description);
            genre = data.book.genreId;

            $.ajax({
                type: 'GET',
                url: 'https://lectet.herokuapp.com/backend/books/genres',
                success: function (respond) {
                    $("#book_category").text(respond.genres[genre].description);
                }
            });

            $.ajax({
                type: 'GET',
                url: 'https://lectet.herokuapp.com/backend/books/genre/' + genre,
                success: function (data1) {
                    console.log(data1);
                    id = '#related_book';
                    $(id).css({
                        'visibility': 'visible'
                    });
                    var related_books = '';

                    var length = data1.books.length;

                    if (length > 6) {
                        length = 6;
                    }

                    for (var i = 0; i < length; i++) {

                        if (data1.books[i].id != $.urlParam('id')) {
                            // console.log(data.author.books[i].name);
                            related_books = related_books + '<div class="col-lg-4 col-md-6 col-sm-6">' +
                                '<div class="single-related-product d-flex">' +
                                '<a href="' + './product.html?id=' + data1.books[i].id + '"><img src="../assets/images/books/book_' + data1.books[i].id + '.jpg' + '" class="fakeimg" alt=""></a>' +
                                ' <div class="text-center">' +
                                '<a href="' + './product.html?id=' + data1.books[i].id + '" class="title">' + data1.books[i].name + '</a>' +
                                '<div class="price">' +
                                '<h6>' + data1.books[i].price + ' €</h6>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        } else
                            length = length + 1;
                    }
                    $(id).html(related_books);
                }
            });
        }
    });

    $.ajax({
        type: 'GET',
        url: 'https://lectet.herokuapp.com/backend/events/book/' + $.urlParam('id'),
        success: function (data2) {
            if (data2.events.length > 0) {
                console.log(data2);
                id = '#event';
                $(id).css({
                    'visibility': 'visible'
                });
                var books_event = '<div class="row">' +
                    '<div class="col-md-9 cta-contents">' +
                    '<h3 class="cta-title">' + data2.events[0].name + '</h3>' +
                    '</div>' +
                    '<div class="col-md-3 cta-button">' +
                    '<a href="./event.html?id=' + data2.events[0].id + '" class="btn btn-lg btn-block btn-primary"> To learn more</a>' +
                    '</div>' +
                    '</div>';

                $(id).html(books_event);
            }
        }
    });

    document.getElementById("addToCart").onclick = function () {
        addToCart();
    };

    const userkey = JSON.parse(window.localStorage.getItem("lectet"));

    function addToCart() {

        var $id = $.urlParam('id');

        if (userkey) {

            $.ajax({
                url: 'https://lectet.herokuapp.com/backend/cart/',
                type: 'GET',
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", userkey.token);
                    console.log(userkey.token);
                    console.log("DONE IT");
                    console.log('https://lectet.herokuapp.com/backend/cart/' + $id);
                },
                success: function (response) {

                    if (response.cart == null) {
                        console.log("NO EXISTE CESTA");

                        $.ajax({
                            url: 'https://lectet.herokuapp.com/backend/cart/',
                            type: 'POST',
                            data: [],
                            dataType: 'json',
                            contentType: 'application/json',
                            beforeSend: function (request) {
                                request.setRequestHeader("Authorization", userkey.token);
                                console.log(userkey.token);
                                console.log("DONE IT");
                                console.log('https://lectet.herokuapp.com/backend/cart/' + $id);
                            },
                            success: function (response) {
                                console.log("I ADD TO CART");
                                console.log(response);

                                $.ajax({
                                    url: 'https://lectet.herokuapp.com/backend/cart/' + $id,
                                    type: 'POST',
                                    dataType: 'json',
                                    contentType: 'application/json',
                                    beforeSend: function (request) {
                                        request.setRequestHeader("Authorization", userkey.token);
                                        console.log(userkey.token);
                                        console.log("DONE IT");
                                        console.log('https://lectet.herokuapp.com/backend/cart/' + $id);
                                    },
                                    success: function (response) {
                                        console.log("I ADD TO CART");
                                        console.log(response);
                                    },
                                    error: function (error) {
                                        console.log("Error while adding");
                                        console.log(error);
                                    }
                                });
                            },
                            error: function (error) {
                                console.log("Error while adding");
                                console.log(error);
                            }
                        });
                    } else {
                        $.ajax({
                            url: 'https://lectet.herokuapp.com/backend/cart/' + $id,
                            type: 'POST',
                            dataType: 'json',
                            contentType: 'application/json',
                            beforeSend: function (request) {
                                request.setRequestHeader("Authorization", userkey.token);
                                console.log(userkey.token);
                                console.log("DONE IT");
                                console.log('https://lectet.herokuapp.com/backend/cart/' + $id);
                            },
                            success: function (response) {
                                console.log("I ADD TO CART");
                                console.log(response);
                            },
                            error: function (error) {
                                console.log("Error while adding");
                                console.log(error);
                            }
                        });
                    }
                },
                error: function (error) {
                    console.log("Error while adding");
                    console.log(error);
                }
            });
        } else {
            $("#myModalLabel").text("Not logged in");

            var modalBody = "";

            modalBody = modalBody + '<div class="modal-body popup-center">' +
                'You need to be logged in for buy a book.' +
                '</div>' +
                '<br/>' +
                '<div class="modal-body popup-center">' +
                'You can login by clicking on the button: ' +
                '<a href="./login.html">' +
                '<button id="button-modal" type="button">' +
                '<span aria-hidden="true">Login</span>' +
                '</button>' +
                '</a>' +
                '<br/> ' +
                '<br/>' +
                'Or if you have not registered yet you can register by clicking the following button: ' +
                '<a href="./registration.html">' +
                '<button id="button-modal" type="button">' +
                '<span aria-hidden="true">Register</span>' +
                '</button>' +
                '</a>' +
                '</div>'

            $("#myModalBody").text("You need to be logged in for buy a book");
            $("#container-modal-body").html(modalBody);
        }
    }

});