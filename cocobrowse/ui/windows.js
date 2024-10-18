//import $ from 'jquery';
var tab_array = [];
var maximized = false;
var stored_top = "0px";
var stored_left = "0px";
function AppendTab()
{
    const workspace = document.getElementsByClassName("workspace")[0];
    const tab_bar = document.getElementsByClassName("tab_bar")[0];

    let rand_id = String(Math.floor(Math.random()*1000000));

    let content = document.createElement('div');//$.get("tab_template.html").response;
    content.className = "window";
    content.id = rand_id;
    content.style = "top:0; left:0; --topagain : 0px; --leftagain : 0px; transition: all 0.3s ease;";
    content.onmousedown = function(){disable_mouse(rand_id)};
    content.onmouseup = function(){enable_mouse(rand_id)};
    content.innerHTML = '<div class="header" onmousedown="initializeMove('+rand_id+')">'+
    '<input class="header_input" id="'+rand_id+'_input"></input>'+
    '<button class="header_button" onclick="closeTab('+rand_id+')" style="right : 4px; font-size : 16; align-items: baseline;"><b>⤬</b></button>'+
    '<button class="header_button" id="'+rand_id+'_maximize" onclick="maximizeTab('+rand_id+')" style="right : 36px; font-size : 16;"><b>▢</b></button>'+
    '<button class="header_button" id="'+rand_id+'_minimize" onclick="minimizeTab('+rand_id+')" style="right : 68px; font-size : 10;"><b>━</b></button>'+
    '<button class="header_button" id="'+rand_id+'_forward" onclick="goForwards('+rand_id+')" style="right : 100px; align-items: baseline;"><b>⮞</b></button>'+
    '<button class="header_button" id="'+rand_id+'_back" onclick="goBackwards('+rand_id+')" style="right : 132px; align-items: baseline;"><b>⮜</b></button>'+
    '</div>'+
    '<iframe scrolling="yes" src="https://space356.github.io" class="webcontent" id="'+String(rand_id)+'_webcontent"></iframe>';
    workspace.append(content);
    tab_array.push(rand_id);
    document.getElementById(rand_id+"_input").addEventListener('keydown', function(event)
    {
        if (event.key === 'Enter')
        {
          goToUrl(rand_id);
        }
    });

    let content2 = document.createElement('button');
    content2.className = "tab_img";
    content2.id = rand_id+"_tab";
    content2.onclick = function(){minimizeTab(rand_id);z_order_tab(rand_id);};
    content2.innerHTML = '<img src="c0c0nut.png" style="width : 100%; height : 100%">'
    tab_bar.insertBefore(content2,tab_bar.children[tab_bar.children.length-1]);

    console.log("Help me");
    return rand_id;
}
function z_order_tab(id)
{
    tab_array.splice(tab_array.indexOf(id),1);
    tab_array.push(id);
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
    const webs = document.querySelectorAll(".webcontent");
    const windo = document.getElementById(id);
    z_order_tab(id);
    webs.forEach((entry) =>
    {
        entry.classList.add("click_disable");
    })
    console.log("Calling mouse diable.");
    windo.style.transition = "none";
}
function enable_mouse(id)
{
    const webs = document.querySelectorAll(".webcontent");
    const windo = document.getElementById(id);
    webs.forEach((entry) =>
    {
        entry.classList.remove("click_disable");
    })
    console.log("Calling mouse enable.");
    windo.style.transition = "all 0.3s ease";
}

function goToUrl(id)
{
    const webvw = document.getElementById(id+"_webcontent");
    const input = document.getElementById(id+"_input");
    let url = input.value;

    if (!/^https?:\/\//i.test(url))
        {
        url = 'https://' + url;
    }
    webvw.src = url;
    input.value = url;
}

function goBackwards(id)
{
    //const frame = document.getElementById(id+"_webcontent"); //Old code, and requires Electron
    //frame.ExecuteJavaScript(history.back());
}

function goForwards(id)
{
    //const frame = document.getElementById(id+"_webcontent"); //Old code, and requires Electron
    //frame.history.forward();
}

function closeTab(id)
{
    document.getElementById(id).remove();
    document.getElementById(id+"_tab").remove();
    tab_array.splice(tab_array.indexOf(id),1);
}

function minimizeTab(id)
{
    const windo = document.getElementById(id);
    const back_button = document.getElementById(id+"_back");
    const forward_button = document.getElementById(id+"_forward");
    const min_button = document.getElementById(id+"_minimize");
    const webcont = document.getElementById(id+"_webcontent");
    const _input = document.getElementById(id+"_input");

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
            webcont.style.display = "none";
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
            webcont.style.display = "initial";
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
            webcont.style.display = "initial";
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
            webcont.style.display = "none";
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
}

function openCustomize()
{
    const webcontent = document.getElementById("cosmetics");
    webcontent.hidden = !webcontent.hidden;
}