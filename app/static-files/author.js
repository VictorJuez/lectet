$(document).ready(() => {

    var $author_name = $('#author_name');
    var $short_bio = $('#short_bio');
    var $long_bio = $('#long_bio');

    $.ajax({
        type: 'GET',
        url: 'https://lectet.herokuapp.com/api/authors/1',
        success: function (data) {

            $author_name.html('<h2> ' + data.author.name + " " + data.author.lastName + '</h2>');
            $short_bio.html('<p>' + data.author.description + '</p>');
            $long_bio.html('<p>' + data.author.description + '</p>');
            for (var i = 0; i < data.author.books.length; i++) {
                id = '#related_book';
                // console.log(data.author.books[i].name);
                $(id).css({ 'visibility': 'visible' });
                $(id).html('<div class="col-lg-4 col-md-6 col-sm-6">' +
                    '<div class="single-related-product d-flex">' +
                    '<a href="#"><img src="" class="fakeimg" alt=""></a>' +
                    ' <div class="text-center">' +
                    '<a href="' + 'product.html?id=' + data.author.books[i].id + '" class="title" id="related_book1_name">' + data.author.books[i].name + '</a>' +
                    '<div class="price" id="related_book1_price">' +
                    '<h6>' + '$' + data.author.books[i].price + '</h6>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>');
            }

        }
    });
});