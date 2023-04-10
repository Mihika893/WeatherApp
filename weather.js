// displaying random background images from an array of images
function changeBackground() {
    var images = [
      "img/image1.jpg",
      "img/image2.jpg",
      "img/image3.jpg",
      "img/image4.jpg",
      "img/image5.jpg"
    ];
    var randomNumber = Math.floor(Math.random() * images.length);
    document.body.style.backgroundImage = "url('" + images[randomNumber] + "')";
    document.body.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
  }

window.addEventListener("load", changeBackground);

let weather = {
    "apiKey" : "6cce68bf5bc6c27114d132c98ff899bb",
     fetchWeather : function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&apiKey=" + this.apiKey
        ).then((response)=> response.json())
        .then((data)=> this.displayWeather(data));
     },
     displayWeather : function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerHTML = " Weather in " + name;
        document.querySelector(".weather-icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = (temp - 273.15).toFixed(2) + "°C";
         document.querySelector(".humidity").innerHTML = humidity + "%";
        document.querySelector(".wind").innerHTML = speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");

        // //to generate random images of city based on user input
        // document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
        // document.body.style.backgroundRepeat = 'no-repeat';
        // document.body.style.backgroundSize = 'cover';
        // document.body.style.backgroundAttachment = 'fixed';
        
      },
    search: function(){
      this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function(){
  weather.search();
});

document.querySelector(".search input").addEventListener('keyup', function(event){
  if (event.keyCode === 13) {
    weather.search();
  }
  
});

weather.fetchWeather("Denver");


