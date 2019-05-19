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
    var $book_title = $('#book_title');
    var $author_name = $('#author_name');
    var $author_name_bottom = $('#author_name_bottom');
    var $book_price = $('#book_price');
    var $book_description = $('#book_description');
    var $book_long_description = $('#book_long_description');
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


        }
    });
    $.ajax({
        type: 'GET',
        url: 'https://lectet.herokuapp.com/api/books/favourites',
        success: function (data1) {
            console.log(data1);
            id = '#related_book';
            $(id).css({ 'visibility': 'visible' });
            var related_books = '';
            for (var i = 0; i < data1.books.length; i++) {

                // console.log(data.author.books[i].name);
                related_books = related_books + '<div class="col-lg-4 col-md-6 col-sm-6">' +
                    '<div class="single-related-product d-flex">' +
                    '<a href="#"><img src="" class="fakeimg" alt=""></a>' +
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
});