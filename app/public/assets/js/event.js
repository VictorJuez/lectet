$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return results[1] || 0;
    }
}


$(document).ready(() => {

    $.ajax({
        type: 'GET',
        url: 'https://lectet.herokuapp.com/backend/events/' + $.urlParam('id'),
        success: function (respond) {

            var date = "";
            var hour = "";

            var dateReceive = respond.event.date;

            for (var x = 0; x < 10; x++) {
                date = date + dateReceive.charAt(x);
            }

            for (x = 11; x < 16; x++) {
                hour = hour + dateReceive.charAt(x);
            }
            
            date = date.replace(/[-]/g, '/');

            $("#event-img").attr("src", "../assets/images/events/event_" + $.urlParam('id') + ".jpg")

            $("#title-event").text(respond.event.name);
            $("#date-event").text(date);
            $("#hour-event").text(hour);
            $("#description-event").text(respond.event.description);

            $("#name-book").text(respond.event.books[0].name);
            $("#img-book").attr("src", "../assets/images/books/book_" + respond.event.books[0].id + ".jpg");
            $("#author-book").text(respond.event.books[0].authors[0].name + " " + respond.event.books[0].authors[0].lastName);
            $("#description-book").text(respond.event.books[0].description);
            $("#button-book").attr("onclick", "location.href='./product.html?id=" + respond.event.books[0].id + "'");

        }
    });

});