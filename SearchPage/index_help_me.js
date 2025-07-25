var bookmarks = "Hosting Site,https://space356.github.io";
var bookmark_buttons = [];
//var bookmark_z_index = 0;
var search_engine = "https://www.bing.com/search?q=c0c0";
var settings =
{
    prev_search : false,
    brightness : 100
}
var logo_rotate = true;

function onload()
{
    setting_load();
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
            if(settings.prev_search)
            {
                localStorage.setItem("searchVal",input.value);
            }
        }
    });
    //console.log("http://textance.herokuapp.com/title/");
    if(settings.prev_search)
    {
        input.value = localStorage.getItem("searchVal");
    }

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
    if(settings.prev_search)
    {
        input.value = localStorage.getItem("searchVal");
    }

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

function add_bookmark(_name,url,)
{
    const bookmark_menu = document.getElementById("bookmark_menu");

    rand_id = String(Math.floor(Math.random()*1000000));
    
    console.log("Attempting to add bookmark")
    const favicon = "http://www.google.com/s2/favicons?sz=64&domain="+url;

    // style="z-index : '+String(bookmark_z_index)+';"
    bookmark_menu.innerHTML = '<a href="'+url+'" class="book_button button_animation" id="'+rand_id+'"><h1 class="book_text" style="pointer-events: none;">'+_name+'</h1><img src="'+favicon+'" class="book_img"><button class="book_delete" onclick="event.preventDefault(); delete_bookmark('+rand_id+');">X</button></a>'+bookmark_menu.innerHTML;
    bookmark_buttons.push(rand_id);
    //bookmark_z_index ++;
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
    const logo = document.getElementById("logo");
    if(logo_rotate)
    {
        logo.style.setProperty("--logo-rotate","3deg");
    }
    else
    {
        logo.style.setProperty("--logo-rotate","-3deg");
    }
    logo.classList.add("logo_hover");
    logo_rotate = !logo_rotate;
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
    console.log(file);
    
    const arrayBuffer = await file.arrayBuffer();
    console.log(arrayBuffer);
    const base64String = btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    
    console.log(base64String);
    //storeImage("wallpaper",base64String);
    //getImage("wallpaper", function(base64)
    //{
        //wallpaper.src = base64;
    //});
    
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
function delete_bookmark(id)
{
    let index = Infinity;
    for(let i=0;i<bookmark_buttons.length;i++)
    {
        if(bookmark_buttons[i] == id)
        {
            index = i;
            break;
        }
    }
    //splits the bookmarks, gets the string data at the wanted index, and "removes" it from the original string.
    console.log("Trying to create splitter index "+String(index)+" from "+String(bookmarks.split("|")))
    const splitter = bookmarks.split("|")[index];
    bookmarks = bookmarks.replace(splitter,"");
    console.log("Trying to delete: "+splitter);
    if(bookmarks.includes(splitter))
    {
        console.log("Failed to remeove "+splitter)
    }
    else
    {
        console.log("Success in removing "+splitter);
        console.log("bookmarks now = "+bookmarks);
    }
    //ensures there are no double breaks
    bookmarks = bookmarks.replace("||","|");
    if(bookmarks[0] == "|")
    {
        bookmarks = bookmarks.substring(1,bookmarks.length);
    }
    console.log("after replacing double breaks, bookmarks now = "+bookmarks);
    bookmark_buttons.splice(index,1);
    //if(bookmark_buttons.contains(rand_id))
    //{
        //console.log("Failed to remove button id from list.")
    //}
    if(index != Infinity)
    {
        localStorage.setItem("saved_bookmarks",bookmarks);
        //deletes the button
        document.getElementById(id).remove();
    }
}

function setting_reset()
{
    settings.prev_search = document.getElementById("setting_presearch").checked;
    settings.brightness = document.getElementById("bg_brightness").value;
    localStorage.setItem("settings",JSON.stringify(settings));
}
function setting_load()
{
    const temp_settings = localStorage.getItem("settings");
    if(temp_settings)
    {
        settings = JSON.parse(temp_settings);
        document.getElementById("setting_presearch").checked = settings.prev_search;
        document.getElementById("bg_brightness").value = settings.brightness;

        const img = document.getElementById('wallpaper').style.opacity = settings.brightness;
    }

    load_widgets();
}

function brightness_change()
{
    const img = document.getElementById('wallpaper');
    img.style.opacity = document.getElementById("bg_brightness").value;
    setting_reset();
}