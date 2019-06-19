$(document).ready(() => {

    $.ajax({
        url: 'https://lectet.herokuapp.com/backend/events/now',
        success: function (respuesta) {

            var id;

            var length = respuesta.events.length;
            var difference = 0;

            if (length > 4) {
                length = 4;
            } else {
                difference = respuesta.events.length;
            }

            console.log(respuesta.events.length);
            for (var i = 0; i < length; i++) {

                id = '#event_' + i;

                $("#item" + i).css('background', 'url(./assets/images/events/event_' + respuesta.events[i].id + '.jpg) no-repeat center center fixed')
                $("#button-event_" + i).attr("onclick", "location.href='./pages/event.html?id=" + respuesta.events[i].id + "'");

                $(id).html('<h3 class="event-name">' + respuesta.events[i].name + '</h3>');

                if (i == (length - 1) && length < 4) {

                    console.log("ENTRO");
                    console.log(difference);

                    $.ajax({
                        url: 'https://lectet.herokuapp.com/backend/events/',
                        async: true,
                        success: function (respond) {

                            for (var x = difference; x < 4; x++) {
                                id = '#event_' + x;

                                $("#item" + x).css('background', 'url(./assets/images/events/event_' + respond.events[x].id + '.jpg) no-repeat center center fixed')
                                $("#button-event_" + x).attr("onclick", "location.href='./pages/event.html?id=" + respond.events[x].id + "'");

                                $(id).html("<h3>" + respond.events[x].name + "</h3>");
                            }
                        },
                        error: function () {
                            console.log("No se ha podido obtener la información");
                        }
                    });

                }
            }
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });

    $.ajax({
        url: 'https://lectet.herokuapp.com/backend/books/favourites',
        success: function (respond) {

            console.log(respond);
            for (var i = 0; i < 8; i++) {
                $(".first-title-recommended_" + i).text(respond.books[i].name);
                $(".price-recommended_" + i).text(respond.books[i].price + " €");
                $(".button-recommended_" + i).attr("onclick", "location.href='./pages/product.html?id=" + respond.books[i].id + "'");
                console.log(respond.books[i].authors[0].name + " " + respond.books[i].authors[0].lastName);
                $(".second-title-recommended_" + i).text(respond.books[i].authors[0].name + " " + respond.books[i].authors[0].lastName);
                $(".img-recommended_" + i).attr("src", "./assets/images/books/book_" + respond.books[i].id + ".jpg");
            }
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });

    $.ajax({
        url: 'https://lectet.herokuapp.com/backend/books/genres',
        success: function (respuesta) {

            var id;
            var list_id = [];
            for (var i = 0; i < 3; i++) {
                var id_category = getRandomInt(0, respuesta.genres.length, list_id);

                id = '#category_' + i;

                console.log("#category_" + i + " IS " + respuesta.genres[id_category].description);
                $(id).text(respuesta.genres[id_category].description);

                $.ajax({
                    url: 'https://lectet.herokuapp.com/backend/books/genre/' + (id_category + 1),
                    async: false,
                    success: function (respond) {

                        console.log("Categoria: " + respond.books[0].genreId);

                        for (var j = 0; j < 8; j++) {
                            console.log("I = " + i + " , " + "J = " + j);
                            console.log(respond.books[j].name);
                            console.log(respond.books[j].price);
                            console.log(".first-title-book" + j + "_" + i);
                            $(".first-title-book" + j + "_" + i).text(respond.books[j].name);
                            $(".price-book" + j + "_" + i).text(respond.books[j].price + " €");
                            $(".button" + j + "_" + i).attr("onclick", "location.href='./pages/product.html?id=" + respond.books[j].id + "'");
                            $(".second-title-book" + j + "_" + i).text(respond.books[j].authors[0].name + " " + respond.books[j].authors[0].lastName);
                            $(".img-book" + j + "_" + i).attr("src", "./assets/images/books/book_" + respond.books[j].id + ".jpg");

                        }
                    },
                    error: function () {
                        console.log("No se ha podido obtener la información");
                    }
                })

            }
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });

    $.ajax({
        url: 'https://lectet.herokuapp.com/backend/books/bestsellers',
        success: function (respond) {

            $.ajax({
                url: 'https://lectet.herokuapp.com/backend/books/' + respond[0].bookId,
                success: function (respond) {
                    $("#name-most-sell").text(respond.book.name);
                    $("#author-most-sell").text(respond.book.authors[0].name + " " + respond.book.authors[0].lastName);
                    $("#description-most-sell").text(respond.book.description);

                    $("#img-most-sell").attr("src", "./assets/images/books/book_" + respond.book.id + ".jpg");

                    $("#button-most-sell").attr("onclick", "location.href='./pages/product.html?id=" + respond.book.id + "'");
                }
            })

        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });

    $.ajax({
        url: 'https://lectet.herokuapp.com/backend/books/8',
        success: function (respond) {


            $("#name-best-valorate").text(respond.book.name);
            $("#author-best-valorate").text(respond.book.authors[0].name + " " + respond.book.authors[0].lastName);
            $("#description-best-valorate").text(respond.book.description);

            $("#img-best-valorate").attr("src", "./assets/images/books/book_" + respond.book.id + ".jpg");

            $("#button-best-valorate").attr("onclick", "location.href='./pages/product.html?id=" + respond.book.id + "'");

        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });

    function getRandomInt(min, max, list_id) {

        var send = true;
        var find = false;

        while (send) {

            var id = Math.floor(Math.random() * (max - min)) + min;

            for (var i = 0; i < list_id.length; i++) {
                if (id == list_id[i]) {
                    find = true;
                }
            }

            if (find == false) {
                list_id.push(id);
                send = false;
            }

            find = false;
        }

        return id;
    }

    (function () {
        $('.carousel-showmanymoveone .item').each(function () {

            var itemToClone = $(this);

            for (var i = 1; i < 3; i++) {
                itemToClone = itemToClone.next();

                // wrap around if at end of item collection
                if (!itemToClone.length) {
                    itemToClone = $(this).siblings(':first');
                }

                // grab item, clone, add marker class, add to collection
                itemToClone.children(':first-child').clone()
                    .addClass("cloneditem-" + (i))
                    .appendTo($(this));
            }
        });
    }());

    (function () {
        $('.carousel-showmanymoveone-4 .item').each(function () {

            var itemToClone = $(this);

            for (var i = 1; i < 4; i++) {
                itemToClone = itemToClone.next();

                // wrap around if at end of item collection
                if (!itemToClone.length) {
                    itemToClone = $(this).siblings(':first');
                }

                // grab item, clone, add marker class, add to collection
                itemToClone.children(':first-child').clone()
                    .addClass("cloneditem-" + (i))
                    .appendTo($(this));
            }
        });
    }());
});