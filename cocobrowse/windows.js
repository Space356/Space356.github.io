//import $ from 'jquery';
var tab_array = [];
var maximized = false;
var stored_top = "0px";
var stored_left = "0px";
var viewtype = "iframe"; //webview
var search_engine = "https://space356.github.io/SearchPage";



function AppendTab(url)
{
    if(tab_array.length < 25)
    {
        //gets whether or not the app is running in a browser (replaces webviews with iframes)
        /*if (typeof process.versions === "undefined" || typeof process.versions.electron === "undefined")
        {
            viewtype = "iframe";
        }*/
       var new_url = search_engine;
        if(url)
        {
            new_url = url;
        }
        
        const workspace = document.getElementsByClassName("workspace")[0];
        const tab_bar = document.getElementsByClassName("tab_bar")[0];

        //generates a random id for each tab
        let rand_id = String(Math.floor(Math.random()*1000000));

        //creates the style and content of a tab
        let content = document.createElement('div');//$.get("tab_template.html").response;
        content.className = "window";
        content.id = rand_id;
        content.style = "top:0; left:0; --topagain : 0px; --leftagain : 0px; transition: all 0.3s ease;";
        content.onmousedown = function(){disable_mouse(rand_id)};
        content.onmouseup = function(){enable_mouse(rand_id)};
        //sets the innerHTML of the window div
        content.innerHTML = 
        '<div id="'+rand_id+'_options" class="menu menu_minimize" style="left:0; top:33px; width:128px; z-index: 100;">'+
            '<div class="menu_section">'+
                '<button class="menu_button" onclick="closeTab('+rand_id+')">Close tab</button><br>'+
                '<button class="menu_button">Reload Tab</button><br>'+
                '<button class="menu_button" onclick="duplicateTab('+rand_id+')">Duplicate Tab</button><br>'+
            '</div>'+
            '<div class="menu_section">'+
                '<button class="menu_button">Dock Left</button><br>'+
                '<button class="menu_button">Dock Right</button><br>'+
            '</div>'+
            '<div class="menu_section">'+
                '<button class="menu_button">Bookmark Tab</button><br>'+
            '</div>'+
        '</div>'+
        '<div class="header" onmousedown="initializeMove('+rand_id+')">'+
            '<input class="header_input" id="'+rand_id+'_input"></input>'+
            '<button class="header_button" id="'+rand_id+'_dropdown" onclick="openTabDropdown('+rand_id+')" style="left : 4px; font-size : 16;"><b><img id="'+rand_id+'_icon" src="http://www.google.com/s2/favicons?sz=64&domain='+new_url+'" style="width : 100%; height : 100%"></b></button>'+
            '<button class="header_button" onclick="closeTab('+rand_id+')" style="right : 4px; font-size : 16; align-items: baseline;"><b>⤬</b></button>'+
            '<button class="header_button" id="'+rand_id+'_maximize" onclick="maximizeTab('+rand_id+')" style="right : 36px; font-size : 16;"><b>▢</b></button>'+
            '<button class="header_button" id="'+rand_id+'_minimize" onclick="minimizeTab('+rand_id+')" style="right : 68px; font-size : 10;"><b>━</b></button>'+
            '<button class="header_button" id="'+rand_id+'_forward" onclick="goForwards('+rand_id+')" style="right : 100px; align-items: baseline;"><b>⮞</b></button>'+
            '<button class="header_button" id="'+rand_id+'_back" onclick="goBackwards('+rand_id+')" style="right : 132px; align-items: baseline;"><b>⮜</b></button>'+
        '</div>'+
        '<'+viewtype+' scrolling="yes" src="'+new_url+'" class="webcontent" load-commit="updateURL('+rand_id+')" onload="updateURL('+rand_id+')" did-finish-load="updateURL('+rand_id+')" id="'+String(rand_id)+'_webcontent"></'+viewtype+'>';
        workspace.append(content);
        //for indexing
        tab_array.push(rand_id);
        //ensures the input works properly
        document.getElementById(rand_id+"_input").addEventListener('keydown', function(event)
        {
            if (event.key === 'Enter')
            {
            goToUrl(rand_id);
            }
        });

        //Creates the button in the tab bar
        let content2 = document.createElement('button');
        content2.className = "tab_img";
        content2.id = rand_id+"_tab";
        content2.onclick = function(){minimizeTab(rand_id);z_order_tab(rand_id);};
        content2.innerHTML = '<img id="'+rand_id+'_tab_icon" src="http://www.google.com/s2/favicons?sz=64&domain='+new_url+'" style="width : 100%; height : 100%">'
        tab_bar.insertBefore(content2,tab_bar.children[tab_bar.children.length-1]);

        //redirect management
        document.getElementById("")
        //Help me
        console.log("Help me");
        return rand_id;
    }
    else
    {
        console.log("Max Tabs");
    }
}
function z_order_tab(id)
{
    //deletes the original index, and pushes it to the end
    tab_array.splice(tab_array.indexOf(id),1);
    tab_array.push(id);
    //re-orders the other tabs
    for (var i=0; i<tab_array.length; i++)
    {
        const tab = document.getElementById(tab_array[i]);
        tab.style.zIndex = 50+i;
        console.log("Set "+String(tab_array[i])+" to z value "+String(tab.style.zIndex));
    }
    console.log(tab_array);
}
function disable_mouse(id)
{
    //disables the functionalities of the mouse within webviews to ensure a smooth drag and drop or rescale
    const webs = document.querySelectorAll(".webcontent");
    webs.forEach((entry) =>
    {
        entry.classList.add("click_disable");
    })
    console.log("Calling mouse diable.");
    if(id != 0)
    {
        const windo = document.getElementById(id);
        z_order_tab(id);
        windo.style.transition = "none";
    }
}
function enable_mouse(id)
{
    //re-enables the mouse after the previous function
    const webs = document.querySelectorAll(".webcontent");
    webs.forEach((entry) =>
    {
        entry.classList.remove("click_disable");
    })
    console.log("Calling mouse enable.");
    if(id != 0)
    {
        const windo = document.getElementById(id);
        windo.style.transition = "all 0.3s ease";//was 0.3
    }
}

function goToUrl(id)
{
    const webvw = document.getElementById(id+"_webcontent");
    const input = document.getElementById(id+"_input");
    let url = input.value;

    //adds https automatically if it is not detected in the url bar
    if (!/^https?:\/\//i.test(url))
        {
        url = 'https://' + url;
    }
    webvw.src = url;
    input.value = url;
    
    //favicon hehe
    const tab_icon = document.getElementById(id+"_tab_icon");
    const icon = document.getElementById(id+"_icon");
    tab_icon.src = "http://www.google.com/s2/favicons?domain="+url;
    icon.src = "http://www.google.com/s2/favicons?domain="+url;
    //might have to integrate the selected search engine into this one to allow for searches directly from the url bar
}

function goBackwards(id)
{
    const frame = document.getElementById(id+"_webcontent"); //these work now
    frame.ExecuteJavaScript(history.back());
}

function goForwards(id)
{
    const frame = document.getElementById(id+"_webcontent"); //these work now
    frame.history.forward();
}

function closeTab(id)
{
    const windo = document.getElementById(id);
    document.getElementById(id+"_tab").remove();
    tab_array.splice(tab_array.indexOf(id),1);

    if(split_window_left == windo)
    {
        split_window_left = 0;
    }
    if(split_window_right == windo)
    {
        split_window_right = 0;
    }
    if((split_window_left != 0 || split_window_right != 0) && !maximized)
    {
        split_bar.style.display = "flex";
        console.log("Split Bar Enabled");
    }
    else
    {
        split_bar.style.display = "none";
        console.log("Split Bar Disabled");
    }

    windo.remove();
}

function minimizeTab(id)
{
    const windo = document.getElementById(id);
    const back_button = document.getElementById(id+"_back");
    const forward_button = document.getElementById(id+"_forward");
    const min_button = document.getElementById(id+"_minimize");
    //const webcont = document.getElementById(id+"_webcontent");
    const _input = document.getElementById(id+"_input");

    //if a tab is maximized, it will return the maximized tab to normal as to display the tab you click on
    //If the maximized tab is the one you wish to minimize, it will do so instead of returning it back to its normal state.
    if(maximized)
    {
        const tab_bar = document.getElementsByClassName("tab_bar")[0];
        const max_window = document.querySelectorAll(".maximized")[0];
        tab_bar.classList.remove("hover_hidden");
        max_window.classList.remove("maximized");
        max_window.style.top = stored_top;
        max_window.style.left = stored_left;
        maximized = false;

        if(max_window.id == windo.id)
        {
            windo.classList.add("minimized");
            back_button.style.display = "none";
            forward_button.style.display = "none";
            min_button.innerHTML = "＋";
            min_button.style.fontSize = 16;
            _input.style.display = "none";
            //webcont.style.display = "none";
            windo.style.setProperty("--topagain", windo.style.top);
            windo.style.setProperty("--leftagain", windo.style.left);
            windo.style.top = "90%";
            windo.style.left = "50%";
        }
        else
        {
            windo.classList.remove("minimized");
            back_button.style.display = "initial";
            forward_button.style.display = "initial";
            min_button.innerHTML = "━";
            min_button.style.fontSize = 10;
            _input.style.display = "initial";
            //webcont.style.display = "initial";
            windo.style.top = windo.style.getPropertyValue("--topagain");
            windo.style.left = windo.style.getPropertyValue("--leftagain");
        }
    }
    else
    {
        if(windo.classList.contains("minimized"))
        {
            windo.classList.remove("minimized");
            back_button.style.display = "initial";
            forward_button.style.display = "initial";
            min_button.innerHTML = "━";
            min_button.style.fontSize = 10;
            _input.style.display = "initial";
            //webcont.style.display = "initial";
            windo.style.top = windo.style.getPropertyValue("--topagain");
            windo.style.left = windo.style.getPropertyValue("--leftagain");
        }
        else
        {
            windo.classList.add("minimized");
            back_button.style.display = "none";
            forward_button.style.display = "none";
            min_button.innerHTML = "＋";
            min_button.style.fontSize = 16;
            _input.style.display = "none";
            //webcont.style.display = "none";
            windo.style.setProperty("--topagain", windo.style.top);
            windo.style.setProperty("--leftagain", windo.style.left);
            windo.style.top = "90%";
            windo.style.left = "50%";
        }
    }
}
function maximizeTab(id)
{
    const tab_bar = document.getElementsByClassName("tab_bar")[0];
    const windo = document.getElementById(id);
    
    windo.classList.remove("minimized");
    if(maximized)
    {
        tab_bar.classList.remove("hover_hidden");
        windo.classList.remove("maximized");
        windo.style.top = stored_top;
        windo.style.left = stored_left;
        maximized = false;
    }
    else
    {
        tab_bar.classList.add("hover_hidden");
        windo.classList.add("maximized");
        stored_top = windo.style.top;
        stored_left = windo.style.left;
        windo.style.top = "0px";
        windo.style.left = "0px";
        maximized = true;
    }
    if((split_window_left != 0 || split_window_right != 0) && !maximized)
    {
        split_bar.style.display = "flex";
        console.log("Split Bar Enabled");
    }
    else
    {
        split_bar.style.display = "none";
        console.log("Split Bar Disabled");
    }
}

function openCustomize()
{
    const webcontent = document.getElementById("cosmetics");
    webcontent.hidden = !webcontent.hidden;
}

function openTabDropdown(id)
{
    const dropdow = document.getElementById(id+"_options");
    if(dropdow.classList.contains("menu_minimize"))
    {
        dropdow.classList.remove("menu_minimize");
    }
    else
    {
        dropdow.classList.add("menu_minimize");
    }
}

function duplicateTab(id)
{
    const url = document.getElementById(id+"_webcontent").src;
    console.log(url);
    AppendTab(url);
}

function updateURL(id)
{
    const webcont = document.getElementById(id+"_webcontent");
    const tab_icon = document.getElementById(id+"_tab_icon");
    const icon = document.getElementById(id+"_icon");
    //input
    if(webcont.src !== webcont.contentWindow.location.href)
    {
        webcont.src = webcont.contentWindow.location.href;
    }
    const url = webcont.src;
    const input = document.getElementById(id+"_input");
    input.value = url;

    //favicon
    tab_icon.src = "http://www.google.com/s2/favicons?domain="+url;
    icon.src = "http://www.google.com/s2/favicons?domain="+url;

    interceptLinks(webcont);
}