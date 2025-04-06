const week = ["Sunday","Monday","Chewsday","Wednesday","Thursday","Friday","Saturday"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",];
const interval = setInterval(function()
{
    const now = new Date();
    const date = now.getDate();
    const day = week[now.getDay()];
    const month = months[now.getMonth()];
    const  year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes();

    let am = "am";
    if(hours >= 12)
    {
        am = "pm";
        hours -= 12;
    }
    if(hours == 0)
    {
        hours += 12;
    }

    const times = document.getElementsByName("time");
    times.forEach(time => 
    {
        if(time != null)
        {
            time.innerHTML = String(hours)+":"+String(100+minutes).substring(1,3)+" "+am;
            const datehtmls = document.getElementsByName("datehtml");
            datehtmls.forEach(datehtml => 
            {
                datehtml.innerHTML = day+" "+month+" "+date+", "+year;
            });
        }
    });
    console.log("time");
},1000);