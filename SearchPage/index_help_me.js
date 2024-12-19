var bookmarks = "Hosting Site,https://space356.github.io";
var search_engine = "https://www.bing.com/search?q=c0c0";

function onload()
{
    const search_input = document.getElementById("search_input");
    search_input.addEventListener('keydown', function(event)
    {
        if (event.key === 'Enter')
        {
            search_engine = search_input.value;
            localStorage.setItem("searchEngine",search_engine);

            const label = document.getElementById("search_label");
            if(search_input.value != "")
            {
                search_engine = search_input.value;
                label.innerHTML = "Current: "+search_engine;
            }
            else
            {
                search_engine = "https://www.bing.com/search?q=c0c0";
                label.innerHTML = "Current: Bing(Default)";
            }
        }
    });

    const temp_search = localStorage.getItem("searchEngine");
    if(temp_search && temp_search != "")
    {
        search_engine = temp_search;
        document.getElementById("search_label").innerHTML = "Current: "+search_engine;
    }
    
    const input = document.getElementById("input");
    input.focus();
    input.addEventListener('keydown', function(event)
    {
        if (event.key === 'Enter')
        {
            const query = search_engine.split("c0c0");
            window.location = query[0]+input.value+query[1];
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


    const savedImage = localStorage.getItem('uploadedImage');

    if (savedImage)
    {
        const img = document.getElementById('wallpaper');

        // Convert Base64 string back to binary
        const binaryString = atob(savedImage);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++)
        {
            bytes[i] = binaryString.charCodeAt(i);
        }
        // Create a Blob from the binary data
        const blob = new Blob([bytes], { type: 'image/png' });
        // Create an object URL for the Blob
        const url = URL.createObjectURL(blob);

        img.src = url;
    }
}

function add_bookmark(_name,url)
{
    const bookmark_menu = document.getElementById("bookmark_menu");

    rand_id = String(Math.floor(Math.random()*1000000));
    
    console.log("Attempting to add bookmark")
    const favicon = "http://www.google.com/s2/favicons?sz=64&domain="+url;
    bookmark_menu.innerHTML = '<a href="'+url+'" class="book_button button_animation" id="'+rand_id+'"><h1 class="book_text" style="pointer-events: none;">'+_name+'</h1><img src="'+favicon+'" class="book_img"></a>'+bookmark_menu.innerHTML;
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
//logo jitter fix
function logo_enter()
{
    document.getElementById("logo").classList.add("logo_hover");
}
function logo_leave()
{
    document.getElementById("logo").classList.remove("logo_hover");
}

async function change_background()
{
    const wallpaper = document.getElementById("wallpaper");

    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();

    const arrayBuffer = await file.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    localStorage.setItem('uploadedImage',base64String);

    const uploaded_file = URL.createObjectURL(file);
    wallpaper.src = uploaded_file;
}
function open_settings_menu()
{
    const settings_menu = document.getElementById("settings_menu");
    if(settings_menu.classList.contains("hidden"))
    {
        settings_menu.classList.remove("hidden");
    }
    else
    {
        settings_menu.classList.add("hidden");
    }
}