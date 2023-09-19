
// API Key // 0edf96e4b8499ac386eff79088546a54
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

let weatherAPIURL = "https://api.openweathermap.org"
let weatherAPIKey =  "0edf96e4b8499ac386eff79088546a54"
let searchHistory = []

let searchInput = $("#search-input");
let searchForm = $("#search-form");
let searchHistoryContainer = $("#history")

function fetchCoord(search) {

    let queryURL = `${weatherAPIURL}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherAPIKey}`;
    console.log(queryURL);

        fetch(queryURL).then(function(data) { 
            return data.json();

          }).then(function(response) {
                if(!response[0]) {
                    alert("location not found")
                }  else {
                        if(searchHistory.indexOf(search) ! == -1) {
                        return
                        }

                        searchHistory.push(search);

                        localStorage.setItem("search-history", JSON.stringify(searchHistory));
    
                        searchHistoryContainer.html("")
    
                        for let i = 0; i < searchHistory.length; i++){
                        let btn = $("<button>");
                        btn.attr("type", "button ")
                        btn.addClass("history-btn btn-history")
                        btn.text(searchHistory[i])
                        btn.attr("data-search", searchHistory[i]) 
                        searchHistoryContainer.append(btn)

                    } 
                }   
            })
  

function submitSearchFrom(event) {
    event.preventDefault();                                                  

    let search = searchInput.val().trim();
    fetchCoord(search);
}

searchForm.on("submit, submitSearchForm");    