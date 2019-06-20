$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}

const userkey = JSON.parse(window.localStorage.getItem("lectet"));

var booksId = [];
var booksQuantity = [];

$(document).ready(() => {
    $.ajax({
        url: 'https://lectet.herokuapp.com/backend/user/info',
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", userkey.token);
        },
        success: function (respond) {
            $("#fname").text(respond.name + " " + respond.surname);
            $("#email").attr("value", respond.email);
        },
        error: function () {
            console.log("The information could not be obtained.");
        }
    });




    if ($.urlParam('direct') == "no") {

        $.ajax({
            url: 'https://lectet.herokuapp.com/backend/cart/',
            type: 'GET',
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", userkey.token);
            },
            success: function (respond) {

                var quantity = 0;

                var total = 0;

                var id = "#books-order";
                var order = '';

                for (var x = 0; x < respond.cart.books.length; x++) {
                    quantity = quantity + respond.cart.books[x].cart_book.quantity;

                    booksId.push(respond.cart.books[x].id);
                    booksQuantity.push(respond.cart.books[x].cart_book.quantity);

                    order = order + '<p><a href="#">' + respond.cart.books[x].name + '</a> <span class="price">' +
                        respond.cart.books[x].cart_book.quantity + ' x ' +
                        respond.cart.books[x].price + ' € = ' + respond.cart.books[x].cart_book.quantity * respond.cart.books[x].price + ' €</span></p>';

                    total = total + (respond.cart.books[x].cart_book.quantity * respond.cart.books[x].price);
                }

                $("#total-items").text(quantity);

                $("#total-price").text(total + " €");

                $(id).html(order);
            },
            error: function () {
                console.log("The information could not be obtained.");
            }
        });
    } else {

        $.ajax({
            url: 'https://lectet.herokuapp.com/backend/books/' + $.urlParam('id'),
            type: 'GET',
            success: function (respond) {

                var quantity = 1;

                var total = 0;

                var id = "#books-order";
                var order = '';

                order = order + '<p><a href="#">' + respond.book.name + '</a> <span class="price">' +
                    '1 x ' +
                    respond.book.price + ' € = ' + respond.book.price + ' €</span></p>';

                total = respond.book.price;


                $("#total-items").text(quantity);

                $("#total-price").text(total + " €");

                $(id).html(order);
            },
            error: function () {
                console.log("The information could not be obtained.");
            }
        });

    }

    document.getElementById("checkout").onclick = function () {
        if ((document.getElementById("fname").value != "") && (document.getElementById("email").value != "") && (document.getElementById("address").value != "") &&
            (document.getElementById("city").value != "") && (document.getElementById("country").value != "") && (document.getElementById("zip").value)) {
            modalOpen();
            createOrder();
        }
    };

    function modalOpen() {
        $('#miModal').modal({
            backdrop: 'static',
            keyboard: false
        })
    }

    function createOrder() {

        var cart = "";

        for (var x = 0; x < booksId.length; x++) {

            if ((booksId.length - x) > 1) {
                cart = cart + '{ "book"' + ':' + booksId[x] + ',' + '"quantity"' + ':' + booksQuantity[x] + '},'
            } else
                cart = cart + '{ "book"' + ':' + booksId[x] + ',' + '"quantity"' + ':' + booksQuantity[x] + '}'
        }

        var dataInfo = '{ "name"' + ': ' + '"' + document.getElementById("fname").value + '",' +
            '"email"' + ': ' + '"' + document.getElementById("email").value + '",' +
            '"address"' + ': ' + '"' + document.getElementById("address").value + '",' +
            '"city"' + ': ' + '"' + document.getElementById("city").value + '",' +
            '"country"' + ': ' + '"' + document.getElementById("country").value + '",' +
            '"zip"' + ': ' + '"' + document.getElementById("zip").value + '",' +
            '"cart"' + ': ' + '[' + cart + ']}';

        $.ajax({
            url: 'https://lectet.herokuapp.com/backend/orders/',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dataInfo,
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", userkey.token);
            },
            success: function (response) {
            },
            error: function (error) {
                console.log("Error while adding");
            }
        });

        $.ajax({
            url: 'https://lectet.herokuapp.com/backend/cart/',
            type: 'POST',
            async: false,
            dataType: 'json',
            contentType: 'application/json',
            data: [],
            beforeSend: function (request) {
                request.setRequestHeader("Authorization", userkey.token);
            },
            success: function (response) {
            },
            error: function (response) {
                console.log("Error while adding");
            }
        });
    }
});