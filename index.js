let input = document.querySelector("input");
let infoText = document.querySelector(".info-text");
let main = document.querySelector(".main");
let weatherResult = document.querySelector(".weather-result");
let container = document.querySelector(".container");
let button = document.querySelector(".button");
let weatherImage = document.querySelector(".weather-result img");
let arrowIcon = document.querySelector('.header i')

let api;

input.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && input.value !== "") {
    getResponse(input.value);
  }
  
});

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser not support geolocation!");
  }
});

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  fetchData();
}

function onError(error) {
  infoText.classList.add("error");
  infoText.innerHTML = error.message;
}

let apiKey = "ffc57952762c074877e77577ff5cb829";

function getResponse(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchData();
}

function fetchData() {
  infoText.classList.add("pending");
  infoText.innerHTML = "getting weather details...";
  fetch(api)
    .then((response) => response.json())
    .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
  if (info.cod == "404") {
    infoText.classList.replace("pending", "error");
    infoText.innerHTML = `No results for "${input.value}"`;
  } else {
    let city = info.name;
    let country = info.sys.country;
    const { description, id } = info.weather[0];
    const { feels_like, humidity, temp } = info.main;

    if (id == 800) {
      weatherImage.src = "clear.webp";
    } else if (id >= 200 && id <= 202) {
      weatherImage.src="storm.webp"
    }else if (id >= 600 && id <= 622) {
      weatherImage.src="snow.webp"
    }else if (id >= 701 && id <= 781) {
      weatherImage.src="haze.webp"
    }else if (id >= 801 && id <= 804) {
      weatherImage.src="cloudy.webp"
    }else if ((id >= 300 && id <= 321)||(id>=500&&id<=531)) {
      weatherImage.src="rain.webp"
    }


    container.querySelector(".temp .numb").innerHTML = Math.floor(temp);
    container.querySelector(".weather").innerHTML = description;
    container.querySelector(".location span").innerHTML = `${city}, ${country}`;
    container.querySelector(".temp .numb-2").innerHTML = Math.floor(feels_like);
    container.querySelector(".humidity span").innerHTML = `${humidity}%`;
    infoText.classList.remove("pending", "error");
    container.classList.add("active");
  }
}

arrowIcon.addEventListener('click',()=>{
  container.classList.remove('active')
  input.value=""
})