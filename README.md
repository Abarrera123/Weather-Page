# Weather-Page
    -----[https://abarrera123.github.io/Weather-Page/]-------
Why: This website was created to help understand the use of server side APIs. This assignment also helped reinforce js,html,and css skills.
What. This website allows the user to enter a city and hit search. After the button is hit the user is shown the current days weather along with a five day forecast. Below the search bar is a list of featured cities. If the user decides to hit any of the featured cities then the weather for that city will be shown.

How:
1. The first step for this website was to create a skeleton of the HTML. Using Bootstrap i added a nav bar, input field, and a search button. I will add the featured cities after i write the logic in js. 
2. My next step was to declare my global variables in my js file. I set an event listerner to click on the search button. This button will call the inputSubmitCity function. This function will pull the value from the input field. We will then call the getCityWeather using the city as a paramenter for the function. 
3. The getCityWeather function will use the paramenter of city and put the name of the city into a apiURL. This Url will give us the data we need for the current day's weather. Next the fetch api is used to return a json response. with that response we can then extract data and put them in our HTML elements. To get our five day weather and UV index another API is needed. To call this API I set the variable lat and long to the value in the data. 
4. For the next API I enter the values of lat and long into the api url. Once we json the response of the fetch then I can extract the data. I create a for loop to create a 5 day forecast. In that loop I pull the temp, humidity, and wind speed for the day. 
5. The last step I took was to repeat steps 3 and 4 but for the featured cities.  