$(document).ready(() => {

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