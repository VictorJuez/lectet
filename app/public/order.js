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

var normalPrice = [];
var newPrices = [];
var id_books = [];
var quantityNew = [];
var length_cart = 0;
var total;

$(document).ready(() => {
  $.ajax({
    url: 'https://lectet.herokuapp.com/backend/cart/',
    type: 'GET',
    async: false,
    beforeSend: function (request) {
      request.setRequestHeader("Authorization", userkey.token);
      console.log("DONE IT");
      console.log(this.data);
    },
    success: function (response) {
      console.log("all good");
      console.log(response);

      var id = "#cart-order";

      var book_order = "#book-order";
      var price_order = "#price-order";

      var book = '<hr/>';

      var book_order_html = '';
      var price_order_html = '';

      total = 0;

      console.log(response.cart.books.length);

      length_cart = response.cart.books.length;

      for (var x = 0; x < response.cart.books.length; x++) {

        book_order_html = book_order_html + '<h4 id="extract-name-book_' + x + '">' + response.cart.books[x].name + '</h4>';

        price_order_html = price_order_html + '<h4 id="extract-price-book_' + x + '" class="price">' + response.cart.books[x].price * response.cart.books[x].cart_book.quantity + ' €</h4>';

        total = total + (response.cart.books[x].price * response.cart.books[x].cart_book.quantity);

        normalPrice.push(response.cart.books[x].price);
        newPrices.push(response.cart.books[x].price * response.cart.books[x].cart_book.quantity);
        id_books.push(response.cart.books[x].id);
        quantityNew.push(response.cart.books[x].cart_book.quantity);

        book = book + 
        '<div class="container book_' + x + '">' + 
          '<div class="row">' +
            '<div class="col-sm-4 col-xs-5 product">' +
              '<img src="./images/books/book_' + response.cart.books[x].id + '.jpg" class="img-responsive order-img" alt="Image">' +
            '</div>' +
            '<div class="col-sm-6 col-xs-3">' +
              '<h3>' + response.cart.books[x].name + '</h3>' +
              '<h6 class="description-book" id="description-book_' + x + '">' + response.cart.books[x].description + '</h6>' +
            '</div>' +
            '<div class="col-sm-2 col-xs-3">' +
              '<h5 id="price-book_' + x + '" >Price: ' + response.cart.books[x].price + ' €</h5>' +
              
              '<select id="' + x + '" class="form-control" name="Quantity">' +
                '<option value="1" selected>1</option>' +
                '<option value="2">2</option>' +
                '<option value="3">3</option>' +
                '<option value="4">4</opion>' +
                '<option value="5">5</option>' +
              '</select>' + 
              '<button id="' + x + '" class="delete" onclick="deleteBook(this.id)"> X </button>' +
              
              '</div>' +
            '</div>' +
          '</div>' + '<br/>' + '<br/>'
      }

      $("#total-price").text(total + " €");

      $(id).html(book);
      $(book_order).html(book_order_html);
      $(price_order).html(price_order_html);

      for(var y = 0; y < response.cart.books.length; y++) {
        $('#' + y + ' option').removeAttr('selected')
                              .filter('[value=' + quantityNew[y] + ']')
                              .attr('selected', true); 
      }

    },
    error: function () {
      console.log("Error");
    }
  });
});

$(document).ready(() => {

  var quantity;

  var quantitySelected = [];
  var price = [];
  var extract = [];

  var totalElement = document.getElementById('total-price');

  for (var x = 0; x < length_cart; x++) {
    quantitySelected.push(document.getElementById(x));
    price.push(document.getElementById('price-book_' + x));
    extract.push(document.getElementById('extract-price-book_' + x));

    quantitySelected[x].addEventListener('change',
    function () {

      console.log(this.id);

      quantity = this.options[this.selectedIndex];
      quantityNew[this.id] = quantity.value;
      console.log(quantity.value + ': ' + quantity.text);
      newPrices[this.id] = normalPrice[this.id] * quantity.value;

      total = 0;

      console.log("NO ESTOY TOCANDO NADA");

      //$(price[this.id]).text("Price: " + newPrices[this.id] + " €");
      $(extract[this.id]).text(newPrices[this.id] + " €");

      for (var x = 0; x < newPrices.length; x++) {
       
        console.log("New Price: " + newPrices[x]);
       
        total = total + newPrices[x];
      }

      $(totalElement).text(total + " €");

    });
  }
})

function deleteBook (x) {
  console.log(x);
  $(".book_" + x).css({
    'display': 'none'
  });
  $("#extract-price-book_" + x).css({
    'display': 'none'
  });
  $("#extract-name-book_" + x).css({
    'display': 'none'
  });

  var totalElement = document.getElementById('total-price');

  console.log(total);

  console.log(newPrices[x]);

  total = total - newPrices[x];

  $(totalElement).text(total + " €");

  id_books[x] = -1;
  newPrices[x] = 0;
}

$(document).ready(() => {
  $.ajax({
    url: 'https://lectet.herokuapp.com/backend/books/',
    success: function (respond) {

      var id;
      var list_id = [];

      for (var i = 0; i < 7; i++) {

        var id_category = getRandomInt(0, respond.books.length, list_id);

        id = '.button' + i + '_0';

        $(id).attr("onclick", "location.href='product.html?id=" + respond.books[id_category].id + "'");

        $(".img-book" + i + "_0").attr("src", "./images/books/book_" + respond.books[id_category].id + ".jpg");
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

document.getElementById("checkout").onclick = function () {
  
  var enter = false;
  
  if(id_books.length > 0) {
    for(var x = 0; x < id_books.length && enter == false; x++) {
      if(id_books[x] != -1) {
        enter = true;
      }
    }
  }

  if(enter == true) {
    addToCart();
    location.href='./shippment-info.html?direct=no';
  }
};

function addToCart() {
  
  var x = 0;

  var isGood = false;
  var isOnly = false;

  var new_data = "[";


  while(x < id_books.length && isGood == false) {
    if(id_books[x] != -1) {
      new_data = new_data + '{' + '"book"' + ':' + id_books[x] + ',' + '"quantity"' + ':' + quantityNew[x] + '}'

      isGood = true;

      if((x + 1) == id_books.length){
        isOnly = true;
      }

      x++;
    }
    else {
      x++;
    }
  }
  
  if(isOnly == false) {
    for(x; x < id_books.length; x++) {
      if(id_books[x] != -1) {
        new_data = new_data + ',{' + '"book"' + ':' + id_books[x] + ',' + '"quantity"' + ':' + quantityNew[x] + '}'
      }
    }
  }
  
  new_data = new_data + "]";

  console.log(new_data);

  $.ajax({
      url: 'https://lectet.herokuapp.com/backend/cart/',
      type: 'POST',
      async: false,
      dataType: 'json',
      contentType: 'application/json',
      data: new_data,
      beforeSend: function (request) {
          request.setRequestHeader("Authorization", userkey.token);
          console.log("DONE IT");
          console.log(this.data);
          console.log(userkey.token);
      },
      success: function (response) {
          console.log("I ADD TO CART");
          console.log(response);
      },
      error: function (response) {
          console.log("Error while adding");
          console.log(response);
      }
  });

}