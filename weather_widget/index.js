var inter = 1;
async function get_weather(position)
{
    let temp = 0;
    const temperature = document.getElementById("temperature");
    const city = document.getElementById("city");
    const condition = document.getElementById("condition");

    const lon = position.coords.latitude;
    const lat = position.coords.longitude;

    console.log(lon);
    console.log(lat);

    const fetch_string = "https://api.weatherapi.com/v1/current.json?key=5a2b9f1d979849b18a1121304250204&q="+String(lon)+","+String(lat);

    console.log(fetch_string);

    fetch(fetch_string, {
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
      })
}
function do_stuff()
{
  setInterval(function()
  {
    if (navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(get_weather);
    }
    else
    {
      console.log("Geolocation is not supported by your browser.");
    }
    inter = 900000;
  },inter);
}