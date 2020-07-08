let form = document.querySelector(".form");
let close = document.querySelector(".close");
let modalBox = document.querySelector(".modal");
form.addEventListener("submit", async function(e) {
  e.preventDefault();

  // open modal
  modalBox.style.display = "block";

  // fetching long and lat
  let country = document.querySelector(".destination").value;
  let date = document.querySelector(".departure-date").value;

  let geoapi = await fetch(
    `https://us1.locationiq.com/v1/search.php?key=f66cb8d2c19a9f&q=${country}&format=json`
  );
  let georesponse = await geoapi.json();
  let { lat, lon } = georesponse[0];

  // fetching weather
  let weatherapi = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=a05e202da04d4432a742b43238169bcc`
  );
  let weatherResponse = await weatherapi.json();
  let { data, timezone } = weatherResponse;
  let weatherObject = data.find(item => item.datetime === date);
  let { temp, weather } = weatherObject;
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday"
  ];
  console.log(weatherObject);
  let day = days[new Date(date).getDay()];

  let timezoneDOM = document.querySelector(".timezone");
  let dayDOM = document.querySelector(".day");
  let description = document.querySelector(".description");
  let temperature = document.querySelector(".temperature");
  let tempValue = document.querySelector(".temperature-value");
  let tempUnit = document.querySelector(".temperature-unit");

  timezoneDOM.textContent = timezone;
  tempValue.textContent = temp;
  dayDOM.textContent = day.toUpperCase();
  description.textContent = weather.description;

  // converting temperature
  temperature.addEventListener("click", function() {
    if (tempUnit.textContent === "C") {
      tempValue.textContent = ((temp * 9) / 5 + 32).toFixed(1);

      tempUnit.innerHTML = "F";
    } else {
      tempValue.textContent = temp;
      tempUnit.innerHTML = "C";
    }
  });

  //fetching image of country
  let imgDOM = document.querySelector(".country-img");
  let imageResult = await fetch(
    `https://pixabay.com/api/?key=17160601-f237da5b07413588cd75c731b&q=${country}&image_type=photo&pretty=true`
  );
  let imageResponse = await imageResult.json();
  let { hits } = imageResponse;
  let url = hits[0].largeImageURL;
  imgDOM.src = url;
});

close.addEventListener("click", function() {
  modalBox.style.display = "none";
});
