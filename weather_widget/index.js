var inter = 1;
async function get_weather(position)
{
    let temp = 0;
    const temperature = document.getElementById("temperature");
    const city = document.getElementById("city");
    const condition = document.getElementById("condition");

    const rr = document.getElementById("rr");
    const ws = document.getElementById("ws");
    const aq = document.getElementById("aq");

    const lon = position.coords.latitude;
    const lat = position.coords.longitude;

    console.log(lon);
    console.log(lat);

    const fetch_string = "https://api.weatherapi.com/v1/forecast.json?key=5a2b9f1d979849b18a1121304250204&aqi=yes&q="+String(lon)+","+String(lat);

    const air_texts = ["Good","Meh","A Little Bad","Bad","Really Bad","Don't Go Outside"];
    console.log(fetch_string);

    //current fetching
    fetch(fetch_string,
    {
      mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
        // Process and display the weather data
        console.log('Weather Data:', data);

        //for god's sake, SILKSONG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
        temp = data.current.temp_f;
        temperature.innerHTML = String(data.current.temp_f)+"°F";

        //I can't believe Silksong exists.
        city.innerHTML = data.location.name;

        condition.innerHTML = data.current.condition.text+'<img class="condition_image" src="'+data.current.condition.icon+'"><img/>';

        ws.innerHTML = String(data.current.wind_mph)+"mph";
        rr.innerHTML = String(data.forecast.forecastday[0].day.daily_chance_of_rain)+"%";
        aq.innerHTML = air_texts[data.forecast.forecastday[0].day.air_quality["us-epa-index"]-1];
      })
}
function do_stuff()
{
  eek = function()
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(get_weather);
    }
    else
    {
      console.log("Geolocation is not supported by your browser.");
    }
  }
  eek();
  setInterval(eek,900000);
}