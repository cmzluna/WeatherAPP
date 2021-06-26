// next implementations : load actual city of user
// display ajax type ahead in form input
// interface implementations: more info
// display upcoming days forecast
//etc

let btnEnviar = document.querySelector("button");
let input = document.querySelector("input");
let ciudad = document.querySelector("#ciudad");
let temperatura = document.querySelector("#temperatura");
let icono = document.querySelector("#wicon");
let desc = document.querySelector("#descripcion");

function loadCity() {
  if (input.value === "") {
    alert("Please, enter a city");
  } else {
    $.getJSON(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        encodeURI(input.value) +
        "&appid=95176c8edea30e33338e0eaddd53a916&units=metric&lang=en",
      function (data) {
        console.log(data);
        document.querySelector(".container").style.visibility = "visible";
        ciudad.textContent = data.name;
        temperatura.innerHTML = data.main.temp + "<sup>°C</sup>";
        icono.setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        );
        desc.textContent = data.weather[0].description;
        input.value = "";
      }
    ).fail(function () {
      alert("The request went wrong, sorry!. Please enter a city again...");
      input.value = "";
    });
  }
}
window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    loadCity();
  }
});
btnEnviar.addEventListener("click", loadCity);
