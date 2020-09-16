// Generare una griglia 6x6 (36 boxes), ad ogni click parte una richiesta AJAX che prende un numero random da 1 a 9 (scegliere API opportuna).
// Se è <= 5 il quadrato diventa giallo, se è > di 5 il quadrato diventa verde.
// Il numero ottenuto appare al centro del quadrato.


// generating the 6x6 square
var numOfSquare = 6 * 6;

var source = $("#square-template").html();
var template = Handlebars.compile(source);

var html = template();

for (var i = 0; i < numOfSquare; i++) {
  $("#grid").append(html);
}

// add event click to the square
// if API response <= 5 add class .square-yellow
// if API response > 5 add class .square-green
// in every case print the API response inside the div.square

$(".square").click(function() {

  var thisSquare = $(this);
  if (!(thisSquare.hasClass("square-yellow")) && !(thisSquare.hasClass("square-green"))) {
    $.ajax(
      {
        "url": "https://flynn.boolean.careers/exercises/api/random/int",
        "method": "GET",
        "success": function (data, stato) {

          if (data.response <= 5) {
            thisSquare.addClass("square-yellow");
          } else if (data.response > 5) {
            thisSquare.addClass("square-green");
          }

          thisSquare.children("span").text(data.response);

        },
        "error": function (richiesta, stato, errori) {
          alert("error");
        }
      }
    );
  }
});
