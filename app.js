let form = document.querySelector(".form");
let close = document.querySelector(".close");
let modalBox = document.querySelector(".modal");
let formContainer = document.querySelector(".form-container");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  // open modal
  modalBox.style.display = "block";
  formContainer.style.opacity = 0;

  // fetching long and lat
  let country = document.querySelector(".destination").value;
  let date = document.querySelector(".departure-date").value;

  let georesult = await fetch(
    `http://api.geonames.org/searchJSON?formatted=true&q=${country}&maxRows=10&lang=es&username=kareemah&style=full`
  );
  let georesponse = await georesult.json();
  let { lat, lng } = georesponse.geonames[0];

  // fetching weather
  let weatherResult = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=a05e202da04d4432a742b43238169bcc`
  );
  let weatherResponse = await weatherResult.json();
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
  let day = days[new Date(date).getDay() + 1];

  let timezoneDOM = document.querySelector(".timezone");
  let dayDOM = document.querySelector(".day");
  let tempDOM = document.querySelector(".temperature-value");
  let description = document.querySelector(".description");
  timezoneDOM.textContent = timezone;
  dayDOM.textContent = day.toUpperCase();
  tempDOM.textContent = temp;
  description.textContent = weather.description;

  //fetching image of country
  let imgDOM = document.querySelector(".country-img");
  let imageResult = await fetch(
    `https://pixabay.com/api/?key=17160601-f237da5b07413588cd75c731b&q=${country}&image_type=photo&pretty=true`
  );
  let imageResponse = await imageResult.json();
  let { hits } = imageResponse;
  let urls = [];
  hits.forEach(item => urls.push(item.largeImageURL));
  let randomImage = urls[Math.floor(Math.random() * urls.length)];
  imgDOM.src = randomImage;
});

close.addEventListener("click", function() {
  modalBox.style.display = "none";
  formContainer.style.opacity = 1;
});
