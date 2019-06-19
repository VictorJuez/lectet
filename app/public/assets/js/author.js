$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

var categories = [];
var themes = [];

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
            $(id).css({
                'visibility': 'visible'
            });
            var related_books = '';
            for (var i = 0; i < data.author.books.length; i++) {

                insertCategoryTheme(data.author.books[i].genreId, data.author.books[i].themeId);

                // console.log(data.author.books[i].name);
                related_books = related_books + '<div class="col-lg-4 col-md-6 col-sm-6">' +
                    '<div class="single-related-product d-flex">' +
                    '<a href="#"><img src="../assets/images/books/book_' + data.author.books[i].id + '.jpg" class="fakeimg" alt=""></a>' +
                    ' <div class="text-center text-related-book">' +
                    '<a href="' + './product.html?id=' + data.author.books[i].id + '" class="title">' + data.author.books[i].name + '</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            extractCategoryTheme ();

            console.log(categories);
            console.log(themes);

            $(id).html(related_books);

        }
    });
});

function insertCategoryTheme (category, theme) {

    var insideCategory = false;
    var insideTheme = false;

    for(var x = 0; x < categories.length && insideCategory == false; x++) {
        if(categories[x] == category) {
            insideCategory = true;
        }
    }

    for(var x = 0; x < themes.length && insideTheme == false; x++) {
        if(themes[x] == theme) {
            insideTheme = true;
        }
    }

    if(insideCategory == false) {
        categories.push(category);
    }

    if(insideTheme == false) {
        themes.push(theme);
    }

}

function extractCategoryTheme() {



}