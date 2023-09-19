
// API Key // 0edf96e4b8499ac386eff79088546a54
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

let weatherAPIURL = "https://api.openweathermap.org"
let weatherAPIKey =  "0edf96e4b8499ac386eff79088546a54"
let searchHistory = []

let searchInput = $("#search-input");
let searchForm = $("#search-form");
let searchHistoryContainer = $("#history");
let todayContainer = $("#today");

function renderSearchHistory() {
    searchHistoryContainer.html("");
    
    for (let i = 0; i < searchHistory.length; i++) {
    let btn = $("<button>");
    btn.attr("type", "button ");
    btn.addClass("history-btn btn-history");
    btn.text(searchHistory[i]);
    btn.attr("data-search", searchHistory[i]);
    searchHistoryContainer.append(btn);     
    }
}

function appendSearchHistory(){
    if(searchHistory.indexOf(search) ! == -1) {
        return
        }

        searchHistory.push(search);

        localStorage.setItem("search-history", JSON.stringify(searchHistory));
        renderSearchHistory()
}

function renderCurrentWeather(city, weatherData) {
    let date = moment().format("DD/MM/YYYY");
    let tempC = weatherData["main"]["temp"];
    let windKph = weatherData["wind"]["speed"];
    let humidity = weatherData["main"]["humidity"];

    // let iconURL = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png;

    let iconDescription = weatherData.weather[0].description || weather

    let card = $("<div>")
    let cardBody = $("<div>")
    let weatherIcon = $("<img>")
    let heading = $("<h2>")

    let tempEl = $("<p>")
    let windEl = $("<p>")

    let humidityEl = $("<p>")

    card.attr("class", "card");

    cardBody.attr("class", 'card-body");

    card.append(cardBody);

    heading.attr("class", "h3 card-title");
    tempEl.attr("class", "card-text");
    windEl.attr("class", "card-text");
    humidityEl.attr("class", "card-text");

    heading.text(`${city} (${date})`);
    weatherIcon.attr("src", iconURL);
    weatherIcon.attr("alt", iconDescription);

    heading.append(weatherIcon);
    tempEl.text(`Temp ${tempC} C`);
    windEl.text(`Wind ${windKPH} KPH`);
    humidityEl.text(`Humidity ${humidity} %`);
    cardBody.append(heading, tempEl, windEl, humidityEl);
    
    todayContainer.html("");
    todayContainer.append(card);

}

function fetchWeather(location) {
    let lattitude = location.lat; 
    let longitude = location.lon; 
    let city = location.name;

    // let queryWeatherURL = `${weatherAPIURL}/data/2.5/forecast?lat=${lattitude}&lon=${longitude}&units=metric&appid=${weatherAPIKey}

    $.ajax({
    url: queryWeatherURL
    method: "GET"
    }).then(function(response){
        render.CurrentWeather(city, response.list[0]);
        render.Forecast(data.list);

    })
}

function fetchCoord(search) {

    let queryURL = `${weatherAPIURL}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherAPIKey}`;
    console.log(queryURL);

        fetch(queryURL).then(function(data) { 
            return data.json();

          }).then(function(response) {
                if(!response[0]) {
                    alert("location not found")
                }  else {
                    appendSearchHistory(search)  
                    fetchWeather(response[0])

                    } 
                }   
    })
  

function initialiseSearchHistory(){
    let storedHistory = localStorage.getItem("search-history");
    if(storedHistory) {
        searchHistory = JSON.parse(storedHistory);

    }
}

function submitSearchFrom(event) {
    event.preventDefault();                                                  

    let search = searchInput.val().trim();
    fetchCoord(search);
    searchInput.val("");
}

initialiseHistory()
searchForm.on("submit, submitSearchForm");    
