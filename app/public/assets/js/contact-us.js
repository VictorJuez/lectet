$(document).ready(() => {
  /*$('#reused_form input[type=text]').on('change invalid', function () {
    var campotexto = $(this).get(0);

    campotexto.setCustomValidity('');

    if (!campotexto.validity.valid) {
      campotexto.setCustomValidity('Fulfill this field!');
    }
  });

  $('#reused_form input[type=email]').on('change invalid', function () {
    var campotexto = $(this).get(0);

    campotexto.setCustomValidity('');

    if (!campotexto.validity.valid) {
      campotexto.setCustomValidity('Fulfill this field with a correct email!');
    }
  });*/

  document.getElementById("send").onclick = function () {
    console.log("ENTRO");
    if (document.getElementById("message").value != "" && document.getElementById("name").value != "" && document.getElementById("email").value != "") {
      modalOpen();
    }
    console.log("salgo");
    console.log(document.getElementById("message").text);
    $("#message").attr("text", "");

  };

  function modalOpen() {
    $('#miModal').modal({
      backdrop: 'static',
      keyboard: false
    })
  }

});