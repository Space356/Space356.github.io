var bookmarks = "Hosting Site,https://space356.github.io";

function onload()
{
    const input = document.getElementById("input");
    input.addEventListener('keydown', function(event)
    {
        if (event.key === 'Enter')
        {
            window.location = "https://yep.com/web?q="+input.value+"&safeSearch=moderate";
            localStorage.setItem("searchVal",input.value);
        }
    });
    //console.log("http://textance.herokuapp.com/title/");
    input.value = localStorage.getItem("searchVal");

    let temp_bookmarks = localStorage.getItem("saved_bookmarks");
    if(temp_bookmarks)
    {
        if(temp_bookmarks)
        bookmarks = temp_bookmarks;
        temp_bookmarks = temp_bookmarks.split("|");
        for(var i=0;i<temp_bookmarks.length;i++)
        {
            if(temp_bookmarks[i] != '')
            {
                const temp_2 = temp_bookmarks[i].split(",");
                add_bookmark(temp_2[0],temp_2[1]);
            }
        }
    }
    //console.log("http://textance.herokuapp.com/title/");
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

function add_bookmark(_name,url)
{
    const bookmark_menu = document.getElementById("bookmark_menu");

    rand_id = String(Math.floor(Math.random()*1000000));
    
    console.log("Attempting to add bookmark")
    const favicon = "http://www.google.com/s2/favicons?sz=64&domain="+url;
    bookmark_menu.innerHTML = '<a href="'+url+'" class="book_button button_animation" id="'+rand_id+'"><h1 class="book_text">'+_name+'</h1><img src="'+favicon+'" class="book_img"></a>'+bookmark_menu.innerHTML;
}

function submit_bookmark()
{
    const bookmark_input = document.getElementById("bookmark_input");
    const bookmark_name_input = document.getElementById("bookmark_name_input");
    if(bookmark_input.value != "" && bookmark_input.value.includes("."))
    {
        let url = bookmark_input.value;
        //adds https automatically if it is not detected in the url bar
        if (!/^https?:\/\//i.test(url))
            {
            url = 'https://' + url;
        }

        bookmarks += "|"+bookmark_name_input.value+","+url;
        localStorage.setItem("saved_bookmarks",bookmarks);
        add_bookmark(bookmark_name_input.value,url);
        bookmark_input.value = "";
        bookmark_name_input.value = "";
    }
    else
    {
        console.log("Invalid url???");
    }
}
function open_bookmark_menu()
{
    const bookmark_input_menu = document.getElementById("bookmark_input_menu");
    if(bookmark_input_menu.classList.contains("hidden"))
    {
        bookmark_input_menu.classList.remove("hidden");
    }
    else
    {
        bookmark_input_menu.classList.add("hidden");
    }
}