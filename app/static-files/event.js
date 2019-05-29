$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}



$(document).ready(() => {
    console.log("id=" + $.urlParam('id'));

    $.ajax({
        type: 'GET',
      //  url: 'https://lectet.herokuapp.com/api/events/' + $.urlParam('id'),
          url: 'https://lectet.herokuapp.com/api/events/1',
        success: function (respond) {
            console.log(respond);
            console.log(respond.event.books[0].name);
            console.log(respond.event.books[0].authors[0].name);

            $("#title-event").text(respond.event.name);
            $("#description-event").text(respond.event.description);

            $("#name-book").text(respond.event.books[0].name);
            $("#author-book").text(respond.event.books[0].authors[0].name + " " + respond.event.books[0].authors[0].lastName);
            $("#description-book").text(respond.event.books[0].description);
            $("#button-book").attr("onclick", "location.href='product.html?id=" + respond.event.books[0].id + "'");

        }
    });

});