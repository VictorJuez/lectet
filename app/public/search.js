$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

var selectedUrl;
var length;


var selectedGenre;
var selectedTheme;

$(document).ready(() => {

    var filter = "#filter";

    var filter_html = "";

    filter_html = filter_html +
        '<div class="col-sm-4">' +
        '<span>Category: </span>' +
        '<select id="Genre" class="form-control" name="Genre">' +
        '<option value="null" selected> </option>' +
        '<option value="1">Action</option>' +
        '<option value="2">Academic</option>' +
        '<option value="3">Fiction</option>' +
        '<option value="4">History</option>' +
        '</select>' +
        '</div>' +
        '<div class="col-sm-4">' +
        '<span>Theme:</span>' +
        '<select id="Theme" class="form-control" name="Theme">' +
        '<option value="null" selected> </option>' +
        '<option value="1">Descriptive</option>' +
        '<option value="2">Teenager</option>' +
        '<option value="3">Comic</option>' +
        '</select>' +
        '</div>' +

        '<div class="col-sm-4">' +
        '<button id="search" class="search"> SEARCH </button>' +
        '</div>'

    $(filter).html(filter_html);

    $("#result").html($.urlParam('name'));


    if ($.urlParam('selected') == "books" || $.urlParam('selected') == "genre" || $.urlParam('selected') == "theme") {

        if ($.urlParam('selected') == "books") {

            console.log("Selected = " + $.urlParam('selected'));

            selectedUrl = 'https://lectet.herokuapp.com/backend/books/'


        } else {

            selectedUrl = 'https://lectet.herokuapp.com/backend/books/' + $.urlParam('selected') + '/' + $.urlParam('id');

            //selectedUrl = 'https://lectet.herokuapp.com/backend/books/' + $.urlParam('selected') + '/2';

            if ($.urlParam('selected') == "genre") {

                var sel = document.getElementById("Genre");

                var val = $.urlParam('id');

                var opts = sel.options;
                console.log(opts);

                for (var opt, j = 0; opt = opts[j]; j++) {
                    if (opt.value == val) {
                        sel.selectedIndex = j;
                        selectedGenre = opt;
                        break;
                    }
                }

            } else {

                var sel = document.getElementById("Theme");

                var val = $.urlParam('id');

                var opts = sel.options;

                console.log(opts);
                for (var opt, j = 0; opt = opts[j]; j++) {
                    if (opt.value == val) {
                        sel.selectedIndex = j;
                        selectedTheme = opt;
                        break;
                    }
                }
            }

        }

        $.ajax({
            type: 'GET',
            url: selectedUrl,
            success: function (respond) {

                length = respond.books.length;

                console.log(respond);

                var search = "#books-search";

                var book_search = '';

                var max = length;

                if ((6 * $.urlParam('page')) < max) {
                    max = 6 * $.urlParam('page');
                }

                console.log(max);

                for (var x = 6 * ($.urlParam('page') - 1); x < max; x++) {

                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4 card-book">' +

                        '<div class="card result">' +
                        '<img src="./images/books/book_' + respond.books[x].id + '.jpg" class="fakeimg" alt="...">' +
                        '<div class="card-body">' +
                        '<div class="name-book">' +
                        '<h4 class="card-title">' + respond.books[x].name + '</h4>' +
                        '</div>' +
                        '<a href="./author.html?id=' + respond.books[x].authors[0].id + '" >' +
                        '<h6 class="card-text">' + respond.books[x].authors[0].name + ' ' + respond.books[x].authors[0].lastName + '</h6>' + '</a>' +
                        '<a href="./product.html?id=' + respond.books[x].id + '" class="btn btn-primary button-book">' + respond.books[x].price + ' €' + '</a>' +
                        ' </div> ' +
                        '</div>' +

                        '</div>'
                }

                $(search).html(book_search);

                numberPages();
            }
        });

    } else if ($.urlParam('selected') == "authors") {

        $(filter).css("display", "none");

        $.ajax({
            type: 'GET',
            url: 'https://lectet.herokuapp.com/backend/authors/',
            success: function (respond) {

                length = respond.length;

                console.log(respond);

                var search = "#books-search";

                var book_search = '';

                var max = length;

                if ((6 * $.urlParam('page')) < max) {
                    max = 6 * $.urlParam('page');
                }

                for (var x = 6 * ($.urlParam('page') - 1); x < max; x++) {

                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4">' +

                        '<div class="card result author">' +
                        '<div class="box">' +
                        '<img class="author-img" src="./images/authors/author_' + respond[x].id + '.jpg" alt="...">' +
                        '</div>' +
                        '<div class="card-body">' +
                        '<h4 class="card-title">' + respond[x].name + ' ' + respond[x].lastName + '</h4>' +
                        '<a href="./author.html?id=' + respond[x].id + '" class="btn btn-primary button-book"> Go to profile </a>' +
                        ' </div> ' +
                        '</div>' +

                        '</div>'
                }

                $(search).html(book_search);

                numberPages();
            }
        });


    } else if ($.urlParam('selected') == "events") {

        $(filter).css("display", "none");

        $.ajax({
            type: 'GET',
            url: 'https://lectet.herokuapp.com/backend/events/',
            success: function (respond) {

                length = respond.events.length;

                console.log(respond);

                var search = "#books-search";

                var book_search = '';

                var max = length;

                if ((6 * $.urlParam('page')) < max) {
                    max = 6 * $.urlParam('page');
                }

                for (var x = 6 * ($.urlParam('page') - 1); x < max; x++) {

                    book_search = book_search + '<div class="col-xs-10 separation">' +

                        '<div class="card result-event">' +
                        '<img class="img-event result-event" src="./images/events/event_' + respond.events[x].id + '.jpg" alt="...">' +
                        '<div class="card-body result-info-event">' +
                        '<h4 class="card-title">' + respond.events[x].name + '</h4>' +
                        '<a href="./event.html?id=' + respond.events[x].id + '" class="btn btn-primary button-book"> Go to the event </a>' +
                        ' </div> ' +
                        '</div>' +
                        '</div>'
                }

                $(search).html(book_search);

                numberPages();

            }
        });

    } else if ($.urlParam('selected') == "favourites") {

        $(filter).css("display", "none");

        $.ajax({
            type: 'GET',
            url: 'https://lectet.herokuapp.com/backend/books/favourites',
            success: function (respond) {

                length = respond.books.length;

                console.log(respond);

                var search = "#books-search";

                var book_search = '';

                var max = length;

                if ((6 * $.urlParam('page')) < max) {
                    max = 6 * $.urlParam('page');
                }

                for (var x = 6 * ($.urlParam('page') - 1); x < max; x++) {

                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4 card-book">' +

                    '<div class="card result">' +
                    '<img src="./images/books/book_' + respond.books[x].id + '.jpg" class="fakeimg" alt="...">' +
                    '<div class="card-body">' +
                    '<div class="name-book">' +
                    '<h4 class="card-title">' + respond.books[x].name + '</h4>' +
                    '</div>' +
                    '<a href="./author.html?id=' + respond.books[x].authors[0].id + '" >' +
                    '<h6 class="card-text">' + respond.books[x].authors[0].name + ' ' + respond.books[x].authors[0].lastName + '</h6>' + '</a>' +
                    '<a href="./product.html?id=' + respond.books[x].id + '" class="btn btn-primary button-book">' + respond.books[x].price + ' €' + '</a>' +
                    ' </div> ' +
                    '</div>' +

                    '</div>'
                }

                $(search).html(book_search);

                numberPages();

            }
        });
    }


    var selectGenre = document.getElementById('Genre');
    selectGenre.addEventListener('change',
        function () {
            selectedGenre = this.options[selectGenre.selectedIndex];
            console.log(selectedGenre.value + ': ' + selectedGenre.text);
        });

    var selectTheme = document.getElementById('Theme');
    selectTheme.addEventListener('change',
        function () {
            selectedTheme = this.options[selectTheme.selectedIndex];
            console.log(selectedTheme.value + ': ' + selectedTheme.text);
        });


    document.getElementById("search").onclick = function () {
        console.log(selectedGenre.value);
        generateSearch();
    };

    function generateSearch() {

        $.ajax({
            url: 'https://lectet.herokuapp.com/backend/books/filter/?genre=' + selectedGenre.value + '&theme=' + selectedTheme.value,
            type: 'GET',
            success: function (respond) {

                console.log(respond);

                length = respond.length;

                console.log(respond);

                var search = "#books-search";

                var book_search = '';

                var max = length;

                if ((6 * $.urlParam('page')) < max) {
                    max = 6 * $.urlParam('page');
                }

                for (var x = 6 * ($.urlParam('page') - 1); x < max; x++) {

                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4 card-book">' +

                        '<div class="card result">' +
                        '<img src="./images/books/book_' + respond[x].id + '.jpg" class="fakeimg" alt="...">' +
                        '<div class="card-body">' +
                        '<h4 class="card-title">' + respond[x].name + '</h4>' +
                        '<a href="./author.html?id=' + respond[x].authors[0].id + '" >' +
                        '<h6 class="card-text">' + respond[x].authors[0].name + ' ' + respond[x].authors[0].lastName + '</h6>' + '</a>' +
                        '<a href="./product.html?id=' + respond[x].id + '" class="btn btn-primary button-book">' + respond[x].price + ' €' + '</a>' +
                        ' </div> ' +
                        '</div>' +

                        '</div>'
                }

                $("#result").text(selectedGenre.text + " / " + selectedTheme.text);
                $(search).html(book_search);

                numberPages();

            },
            error: function () {
                console.log("Error while looking for books");
            }
        });

    }

    function numberPages() {

        console.log(length);

        var generateNumber = "";
        var numberPages = length / 6;

        numberPages = Math.ceil(numberPages);

        console.log(numberPages);

        var url = "search.html?"

        if ($.urlParam('selected') == "genre" || $.urlParam('selected') == "theme") {
            url = url + "id=" + $.urlParam('id') + "&";
        }

        url = url + "selected=" + $.urlParam('selected') + "&name=" + $.urlParam('name') + "&page=";

        var previous = parseInt($.urlParam('page')) - 1;

        if (previous < 1) {
            previous = 1;
        }

        generateNumber = generateNumber +
            '<li class="page-item">' +
            '<a class="page-link color-pagination" href="' + url + previous + '" aria-label="Previous">' +
            '<span aria-hidden="true">&laquo;</span>' +
            '<span class="sr-only">Previous</span>' +
            '</a>' +
            '</li>'

        for (var x = 1; x <= numberPages; x++) {
            generateNumber = generateNumber +
                '<li class="page-item">' +
                '<a class="page-link color-pagination" href="' + url + x + '">' + x + '</a>' +
                '</li>'
        }

        var next = parseInt($.urlParam('page')) + 1;

        console.log(next);
        console.log(numberPages);

        if (next > numberPages) {
            next = numberPages;
        }


        generateNumber = generateNumber +
            '<li class="page-item">' +
            '<a class="page-link color-pagination" href="' + url + next + '" aria-label="Next">' +
            '<span aria-hidden="true">&raquo;</span>' +
            '<span class="sr-only">Next</span>' +
            '</a>' +
            '</li>'

        $("#nPages").html(generateNumber);
    }

});