$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

var selectedUrl;

$(document).ready(() => {

    if($.urlParam('selected') != "authors" && $.urlParam('selected') != "events") {

        if ($.urlParam('selected') == "books") {

            console.log("Selected = " + $.urlParam('selected'));
    
            selectedUrl = 'https://lectet.herokuapp.com/api/books/'
    
    
        } else {
           
            //url: 'https://lectet.herokuapp.com/api/books/' + $.urlParam('selected') + '/' + $.urlParam('id'),
    
            selectedUrl = 'https://lectet.herokuapp.com/api/books/' + $.urlParam('selected') + '/2';
    
        }

        $.ajax({
            type: 'GET',
            url: selectedUrl,
            success: function (respond) {
                console.log(respond);
    
                var search = "#books-search";
    
                var book_search = '';
    
                for (var x = 0; x < 5; x++) {
    
                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4 card-book">' +
    
                        '<div class="card book" style="width: 18rem;">' +
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
    
            }
        });

    }

    else if($.urlParam('selected') == "authors") {

        $.ajax({
            type: 'GET',
            url: 'https://lectet.herokuapp.com/api/authors/',
            success: function (respond) {
                console.log(respond);
    
                var search = "#books-search";
    
                var book_search = '';
    
                for (var x = 0; x < 4; x++) {
    
                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4">' +
    
                        '<div class="card author" style="width: 18rem;">' +
                        '<img class="author-img" src="./images/authors/author_1.jpg" class="fakeimg" alt="...">' +
                        '<div class="card-body">' +
                        '<h4 class="card-title">' + respond[x].name + ' ' + respond[x].lastName + '</h4>' +
                        '<a href="./product.html?id=' + respond[x].id + '" class="btn btn-primary button-book"> Go to profile </a>' +
                        ' </div> ' +
                        '</div>' +
    
                        '</div>'
                }
    
                $(search).html(book_search);
    
            }
        });


    }

    else {

        $.ajax({
            type: 'GET',
            url: 'https://lectet.herokuapp.com/api/events/',
            success: function (respond) {
                console.log(respond);
    
                var search = "#books-search";
    
                var book_search = '';
    
                for (var x = 0; x < 2; x++) {
    
                    book_search = book_search + '<div class="col-lg-4 col-sm-6 mb-4">' +
    
                        '<div class="card author" style="width: 18rem;">' +
                        '<img class="event-img" src="./images/events/event_' + respond.events[x].id + '.jpg" class="fakeimg" alt="...">' +
                        '<div class="card-body">' +
                        '<h4 class="card-title">' + respond.events[x].name + '</h4>' +
                        '<a href="./event.html?id=' + respond.events[x].id + '" class="btn btn-primary button-book"> Go to the event </a>' +
                        ' </div> ' +
                        '</div>' +
    
                        '</div>'
                }
    
                $(search).html(book_search);
    
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

});