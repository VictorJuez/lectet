$(document).ready(() => {

  document.getElementById("send").onclick = function () {
    if (document.getElementById("message").value != "" && document.getElementById("name").value != "" && document.getElementById("email").value != "") {
      modalOpen();
    }
    $("#message").attr("text", "");

  };

  function modalOpen() {
    $('#miModal').modal({
      backdrop: 'static',
      keyboard: false
    })
  }

});