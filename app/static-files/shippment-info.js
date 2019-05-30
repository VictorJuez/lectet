const userkey = JSON.parse(window.localStorage.getItem("lectet"));

$(document).ready(() => {
    $.ajax({
        url: 'https://lectet.herokuapp.com/api/user/info',
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", userkey.token);
            console.log("DONE IT");
            console.log(this.data);
        },
        success: function (respond) {
            $("#fname").text(respond.name + " " + respond.surname);
            $("#email").attr("value", respond.email);

            console.log(respond.email);
        },
        error: function () {
            console.log("Error");
        }
    });
});


$(document).ready(() => {
    $.ajax({
        url: 'https://lectet.herokuapp.com/api/cart/',
        type: 'GET',
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", userkey.token);
            console.log("DONE IT");
            console.log(this.data);
        },
        success: function (respond) {

            var quantity = 0;

            var total = 0;

            var id = "#books-order";

            var order = '';

            for (var x = 0; x < respond.cart.books.length; x++) {
                quantity = quantity + respond.cart.books[x].cart_book.quantity;
                console.log(respond.cart.books[x].cart_book.quantity);

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
            console.log("Error");
        }
    });
});