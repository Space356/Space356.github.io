function onload()
{
    const input = document.getElementById("input");
    input.addEventListener('keydown', function(event)
    {
        if (event.key === 'Enter')
        {
        window.location = "https://www.google.com/search?q="+input.value+"&safe=active&ssui=on";
        localStorage.setItem("searchVal",input.value);
        }
    });
    console.log("http://textance.herokuapp.com/title/");
    input.value = localStorage.getItem("searchVal");

    /*const savedImage = localStorage.getItem('uploadedImage');

    if (savedImage)
    {
        const img = document.getElementById('wallpaper');
        img.src = savedImage;
    }*/
}

function change_background()
{
    const input = document.getElementById("wallpaper_input");
    const wallpaper = document.getElementById("wallpaper");
    let file = URL.createObjectURL(input.files[0]);
    localStorage.setItem('uploadedImage',file);
    wallpaper.src = file;
}