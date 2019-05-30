$(document).ready(() => {
    var $body = $('body');

    $.ajax({
        url: 'https://lectet.herokuapp.com/api/events/now',
        success: function (respuesta) {

            var id;
            for (var i = 0; i < respuesta.events.length; i++) {

                id = '#event_' + i;

                $(id).html("<h3>" + respuesta.events[i].name + "</h3>");
            }
        },
        error: function () {
            console.log("No se ha podido obtener la información");
        }
    });

    $.ajax({
        url: 'https://lectet.herokuapp.com/api/books/genres',
        success: function (respuesta) {

            var id;
            var list_id = [];
            for (var i = 0; i < 2; i++) {
                var id_category = getRandomInt(0, respuesta.genres.length, list_id);

                id = '#category_' + i;
        
                console.log("#category_" + i + " IS " + respuesta.genres[id_category].description);
                $(id).text(respuesta.genres[id_category].description);

                    $.ajax({
                        url: 'https://lectet.herokuapp.com/api/books/genre/' + (id_category + 1),
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
                                $(".button" + j + "_" + i).attr("onclick", "location.href='product.html?id=" + respond.books[j].id + "'");
                                $(".second-title-book" + j + "_" + i).text(respond.books[j].authors[0].name + " " + respond.books[j].authors[0].lastName);
                                $(".img-book" + j + "_" + i).attr("src", "./images/books/book_" + respond.books[j].id + ".jpg");
                            
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


    


    

    

    /*  function ajaxGet(url, callback) {
          var req = new XMLHttpRequest();
          req.open("GET", url, true);
          req.addEventListener("load", function() {
            if (req.status >= 200 && req.status < 400) {
              // Llamada ala función callback pasándole la respuesta
              callback(req.responseText);
            } else {
              console.error(req.status + " " + req.statusText);
            }
          });
          req.addEventListener("error", function(){
            console.error("Error de red");
          });
          req.send(null);
        }*/

    /*
         $.ajax({
             type: 'GET',
             url: 'https://lectet.herokuapp.com/api/events/now',
             dataType: "json",
           }).done(function(data) {
             alert(data); // imprimimos la respuesta
           }).fail(function(data) {
             alert("Algo salió mal");
             alert(data);
           }).always(function() {
             alert("Siempre se ejecuta")
           });*/

    /*

          $.ajax({
            url: 'api/events/now',
            type: 'GET',
            dataType: "json",
            success: function( response ) {
                alert("He conseguido entrar");
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(errorThrown);
             }
        });

        $('#single-user-btn').click(() => {
            const idUser = $('#id-user').val();
            var userURL = 'api/users/' + idUser;
        
            $.ajax({
                url: userURL,
                type: 'GET',
                dataType: "json",
                success: function( response ) {
                    console.log(response);
                    const user = response[0];
                    $('#found-user').text('User found:');
                    $body.append('<p>name:'+ user.name +' email:'+ user.email+'</p>');
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                 }
            });
        });
        
        $('#all-users-btn').click(() => {
            console.log("button clicked!");
            var userURL = 'api/users/';
        
            $.ajax({
                url: userURL,
                type: 'GET',
                dataType: "json",
                success: function( response ) {
                    console.log(response);
                    for(var i=0; i<response.length; ++i){
                        var user = response[i];
                        $('#found-user').text('User found:');
                        $body.append('<p>name:'+ user.name +' email:'+ user.email+'</p>');
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                 }
            });
        });
        // define a generic Ajax error handler:
        // http://api.jquery.com/ajaxerror/
        $(document).ajaxError(() => {
          console.log("unknown ajax error!");
        });*/
});