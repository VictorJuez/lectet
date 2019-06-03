(function () {
  $('.carousel-showmanymoveone .item').each(function () {
    var itemToClone = $(this);

    for (var i = 1; i < 6; i++) {
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

const userkey = JSON.parse(window.localStorage.getItem("lectet"));

$(document).ready(() => {
  $.ajax({
    url: 'https://lectet.herokuapp.com/api/cart/',
    type: 'GET',
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", userkey.token);
      console.log("DONE IT");
      console.log(this.data);
    },
    success: function (response) {
      console.log("all good");
      console.log(response);

      var id = "#cart";

      var book_order = "#book-order";
      var price_order = "#price-order";

      var book = '<hr/>';

      var book_order_html = '';
      var price_order_html = '';

      var total = 0;

      console.log(response.cart.books.length);

      for (var x = 0; x < response.cart.books.length; x++) {

        book_order_html = book_order_html + '<h4>' + response.cart.books[x].name + '</h4>';

        price_order_html = price_order_html + '<h4 class="price">' + response.cart.books[x].price + ' €</h4>';

        total = total + response.cart.books[x].price;
        
        book = book + '<div class="container">' + '<div class="row">' +
          '<div class="col-sm-4 col-xs-5 product">' +
          '<img src="./images/books/book_' + response.cart.books[x].id + '.jpg" class="img-responsive order-img" alt="Image">' +
          '</div>' +
          '<div class="col-sm-6 col-xs-3">' +
          '<h3>' + response.cart.books[x].name + '</h3>' +
          '<h6>' + response.cart.books[x].description + '</h6>' +
          '</div>' +
          '<div class="col-sm-2 col-xs-3">' +
          '<h5>Price: ' + response.cart.books[x].price + '</h5>' +
          '</div>' +
          '</div>' +
          '</div>' + '<br/>' + '<br/>'
      }

      $("#total-price").text(total + " €");

      $(id).html(book);
      $(book_order).html(book_order_html);
      $(price_order).html(price_order_html);

    },
    error: function () {
      console.log("Error");
    }
  });
});




$(document).ready(() => {
  $.ajax({
    url: 'https://lectet.herokuapp.com/api/books/',
    success: function (respond) {

      var id;
      var list_id = [];

      for (var i = 0; i < 7; i++) {

        var id_category = getRandomInt(0, respond.books.length, list_id);

        id = '.button' + i + '_0';

        $(id).attr("onclick", "location.href='product.html?id=" + respond.books[id_category].id + "'");

        $(".img-book" + i + "_0").attr("src", "./images/books/book_" + respond.books[i].id + ".jpg");
      }

    },
    error: function () {
      console.log("No se ha podido obtener la información");
    }
  });
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