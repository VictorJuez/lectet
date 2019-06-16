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

$(document).ready(() => {

    var filter = "#filter";

    var filter_html = "";

    filter_html = filter_html +
        '<div class="col-sm-4">' +
        '<span>Category: </span>' +
        '<select id="Genre" class="form-control" name="Genre">' +
        '<option value="null" selected> </option>' +
        '<option value="1">Fantasy</option>' +
        '<option value="2">Action</option>' +
        '<option value="3">Mistery</option>' +
        '<option value="4">Drama</option>' +
        '</select>' +
        '</div>' +
        '<div class="col-sm-4">' +
        '<span>Theme:</span>' +
        '<select id="Theme" class="form-control" name="Theme">' +
        '<option value="null" selected> </option>' +
        '<option value="1">Family</option>' +
        '<option value="2">Teenager</option>' +
        '<option value="3">Learn</option>' +
        '<option value="4">Descriptive</option>' +
        '</select>' +
        '</div>' +

        '<div class="col-sm-4">' +
        '<button id="search" class="search"> SEARCH </button>' +
        '</div>'

    $(filter).html(filter_html);

    $("#result").html($.urlParam('name'));


    if ($.urlParam('selected') != "authors" && $.urlParam('selected') != "events") {

        if ($.urlParam('selected') == "books") {

            console.log("Selected = " + $.urlParam('selected'));

            selectedUrl = 'https://lectet.herokuapp.com/api/books/'


        } else {

            //url: 'https://lectet.herokuapp.com/api/books/' + $.urlParam('selected') + '/' + $.urlParam('id'),

            selectedUrl = 'https://lectet.herokuapp.com/api/books/' + $.urlParam('selected') + '/2';

            if ($.urlParam('selected' == "genre")) { //DONT WORK, IT DO IT BEFORE GENERATE THE HTML
                $('#Genre').removeAttr('selected')
                    .filter('[value=' + $.urlParam('name') + ']')
                    .attr('selected', true);
            } else {
                console.log("Entre");
                console.log($.urlParam('name'));
                console.log('[value=' + $.urlParam('name') + ']');
                $('#Theme').removeAttr('selected')
                    .filter('[value=' + $.urlParam('name') + ']')
                    .attr('selected', true);
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

                for (var x = 0; x < 5; x++) {

                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4 card-book">' +

                        '<div class="card result">' +
                        '<img src="./images/books/book_' + respond.books[x].id + '.jpg" class="fakeimg" alt="...">' +
                        '<div class="card-body">' +
                        '<h4 class="card-title">' + respond.books[x].name + '</h4>' +
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
            url: 'https://lectet.herokuapp.com/api/authors/',
            success: function (respond) {

                length = respond.length;

                console.log(respond);

                var search = "#books-search";

                var book_search = '';

                for (var x = 0; x < 4; x++) {

                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4">' +

                        '<div class="card result author">' +
                        '<div class="box">' +
                        '<img class="author-img" src="./images/authors/author_1.jpg" alt="...">' +
                        '</div>' +
                        '<div class="card-body">' +
                        '<h4 class="card-title">' + respond[x].name + ' ' + respond[x].lastName + '</h4>' +
                        '<a href="./product.html?id=' + respond[x].id + '" class="btn btn-primary button-book"> Go to profile </a>' +
                        ' </div> ' +
                        '</div>' +

                        '</div>'
                }

                $(search).html(book_search);

                numberPages();
            }
        });


    } else {

        $.ajax({
            type: 'GET',
            url: 'https://lectet.herokuapp.com/api/events/',
            success: function (respond) {

                length = respond.events.length;

                console.log(respond);

                var search = "#books-search";

                var book_search = '';

                for (var x = 0; x < 2; x++) {

                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4">' +

                        '<div class="card result" style="width: 18rem;">' +
                        '<img class="event-img" src="./images/events/event_' + respond.events[x].id + '.jpg" class="fakeimg" alt="...">' +
                        '<div class="card-body">' +
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

    }





    var selectedGenre;
    var selectedTheme;

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
            url: 'https://lectet.herokuapp.com/api/books/filter',
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "genre": [selectedGenre.value],
                "theme": [selectedTheme.value]
            }),
            beforeSend: function (request) {
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

    function numberPages() {

        console.log(length);

        var generateNumber = "";
        var numberPages = length / 6;

        generateNumber = generateNumber +
            '<li class="page-item">' +
            '<a class="page-link" href="#" aria-label="Previous">' +
            '<span aria-hidden="true">&laquo;</span>' +
            '<span class="sr-only">Previous</span>' +
            '</a>' +
            '</li>'

        for (var x = 1; x <= numberPages + 1; x++) {
            generateNumber = generateNumber +
                '<li class="page-item">' +
                '<a class="page-link" href="#">' + x + '</a>' +
                '</li>'
        }

        generateNumber = generateNumber +
            '<li class="page-item">' +
            '<a class="page-link" href="#" aria-label="Next">' +
            '<span aria-hidden="true">&raquo;</span>' +
            '<span class="sr-only">Next</span>' +
            '</a>' +
            '</li>'

        $("#nPages").html(generateNumber);
    }

});