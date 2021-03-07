
var userInputEl = document.getElementById('user-input')
var searchBtn = document.getElementById('button-addon2')
var weatherContainerEl = document.getElementById('search-result');
var temp = document.getElementById('temp')
var humidity = document.getElementById('humidity')
var wind = document.getElementById('wind-speed')
var uv= document.getElementById('uv-index')
var cityButton = document.getElementsByClassName('col-6 col-sm-3')
var fiveDayContain = $('#five-day')
var featured = $('#featured-container')

//Function to get user input and call on the getCityWeather function
var inputSubmitCity = function(event){
    event.preventDefault();
    //extracts user input into variable city
    var city = userInputEl.value.trim();
    weatherContainerEl.textContent ="Showing Weather for: " + city 
    //checking that the user has an input 
    if(city){
        getCityWeather(city);
        //reset the container of information
    } else {
        alert('Please enter a City')
    }
};

var getCityWeather = function(city){
    //using the user input to reaplce the city name 
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+ '&units=imperial&appid=cdc889a6c131e078f10ee5db1d9fa2e8';
    //clearing all HTML elements
    temp.textContent='Temp: ' 
    humidity.textContent = 'Humidity: '
    wind.textContent ='Wind Speed: '
    uv.textContent='UV Index:'
    fetch(apiUrl)
    .then(function (response){
        //making the data a usable string
        return response.json();
    })
    .then(function (data){
            //using our data we are filling in the temp, humidity, wind speed, and weather img  of the current day.
            temp.textContent='Temp: ' +(data.main.temp)+ '\u00B0 Fahrenheit';
            humidity.textContent = 'Humidity: ' +data.main.humidity+'%';
            wind.textContent ='Wind Speed: ' +data.wind.speed+ 'MPH';
            var img = document.createElement('img');
            img.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
            weatherContainerEl.appendChild(img);
            //setting lat and long for the next api
            var lat = data.coord.lat
            var long = data.coord.lon
            var uvApi= 'https://api.openweathermap.org/data/2.5/onecall?lat=' +lat+ '&lon='+long+'&exclude=hourly,minutely&units=imperial&appid=cdc889a6c131e078f10ee5db1d9fa2e8';
            fetch(uvApi)
            .then(function(response){
                return response.json();
            })
            .then(function (uvData){
                //setting the UV index for the current day's weather
                uv.textContent='UV Index:'+ uvData.current.uvi;
                //for loop to make a 5 day forecast
                for(i=1; i<6; i++){
                //these four lines create the date 
                var unixTime = parseInt(uvData.daily[i].dt)
                var milliseconds = unixTime *1000
                var dateObject = new Date(milliseconds)
                var humanDateFormat = dateObject.toLocaleString() 
               //These lines will generate HTML objects with all the data asked for. 
               var fiveDayHTMLF = '<div id = "day'+i+'">';
                fiveDayHTMLF +='    <div id = "date'+i+'"> Date: ' +humanDateFormat+'</div>';
                fiveDayHTMLF +='    <img src = "http://openweathermap.org/img/w/' + uvData.daily[i].weather[0].icon +'.png">';
                fiveDayHTMLF +='    <div id ="temp'+i+'"> Tempeture:'+uvData.daily[i].temp.day+ '\u00B0 Fahrenheit </div>';
                fiveDayHTMLF +='    <div id ="humidity'+i+'"> Humidity:'+uvData.daily[i].humidity+ '% </div>';
                fiveDayHTMLF += '   <div id = "wind-speed'+i+'">Wind-Speed:' +uvData.daily[i].wind_speed+ 'MPH</div>';
                fiveDayHTMLF +='</div>'
                fiveDayContain.append(fiveDayHTMLF);
            }
                console.log(humanDateFormat);
            })
            
        
    })
}


featured.on('click', 'button',function(event){
    //getting city name 
    event.preventDefault();
    var city = $(this).text();
    //The same exact code from above/
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+city+ '&units=imperial&appid=cdc889a6c131e078f10ee5db1d9fa2e8';
    temp.textContent='Temp: ' 
    humidity.textContent = 'Humidity: '
    wind.textContent ='Wind Speed: '
    uv.textContent='UV Index:'
    fetch(apiUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
            weatherContainerEl.textContent ="Showing Weather for: " + city 
            temp.textContent='Temp: ' +(data.main.temp)+ '\u00B0 Fahrenheit';
            humidity.textContent = 'Humidity: ' +data.main.humidity+'%';
            wind.textContent ='Wind Speed: ' +data.wind.speed+ 'MPH';
            var img = document.createElement('img');
            img.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
            weatherContainerEl.appendChild(img);
            var lat = data.coord.lat
            var long = data.coord.lon
            var uvApi= 'https://api.openweathermap.org/data/2.5/onecall?lat=' +lat+ '&lon='+long+'&exclude=hourly,minutely&units=imperial&appid=cdc889a6c131e078f10ee5db1d9fa2e8';
            fetch(uvApi)
            .then(function(response){
                return response.json();
            })
            .then(function (uvData){
                uv.textContent='UV Index:'+ uvData.current.uvi;
                fiveDayContain.empty();
                for(i=1; i<6; i++){
                var unixTime = parseInt(uvData.daily[i].dt)
                var milliseconds = unixTime *1000
                var dateObject = new Date(milliseconds)
                var humanDateFormat = dateObject.toLocaleString() 
               
               var fiveDayHTMLF = '<div id = "day'+i+'">';
                fiveDayHTMLF +='    <div id = "date'+i+'"> Date: ' +humanDateFormat+'</div>';
                fiveDayHTMLF +='    <img src = "http://openweathermap.org/img/w/' + uvData.daily[i].weather[0].icon +'.png">';
                fiveDayHTMLF +='    <div id ="temp'+i+'"> Tempeture:'+uvData.daily[i].temp.day+ '\u00B0 Fahrenheit </div>';
                fiveDayHTMLF +='    <div id ="humidity'+i+'"> Humidity:'+uvData.daily[i].humidity+ '% </div>';
                fiveDayHTMLF += '   <div id = "wind-speed'+i+'">Wind-Speed:' +uvData.daily[i].wind_speed+ 'MPH</div>';
                fiveDayHTMLF +='</div>'
                fiveDayContain.append(fiveDayHTMLF);
            }
                console.log(humanDateFormat);
            })
            
        
    })
})
  
searchBtn.addEventListener('click', inputSubmitCity);