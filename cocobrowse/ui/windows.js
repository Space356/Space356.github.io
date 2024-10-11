//import $ from 'jquery';
var tab_array = [];
function AppendTab()
{
    const workspace = document.getElementsByClassName("workspace")[0];
    const tab_bar = document.getElementsByClassName("tab_bar")[0];

    let rand_id = String(Math.floor(Math.random()*1000000));

    let content = document.createElement('div');//$.get("tab_template.html").response;
    content.className = "window";
    content.id = rand_id;
    content.style = "top : 0px; left : 0px; --topagain : 0px; --leftagain : 0px;";
    content.onmousedown = disable_mouse;
    content.onmouseup = enable_mouse;
    content.innerHTML = '<div class="header" onmousedown="initializeMove('+rand_id+')">'+
    '<input class="header_input" id="'+rand_id+'_input"></input>'+
    '<button class="header_button" onclick="closeTab('+rand_id+')" style="right : 4px; font-size : 16; align-items: baseline;"><b>⤬</b></button>'+
    '<button class="header_button" id="'+rand_id+'_maximize" onclick="minimizeTab('+rand_id+')" style="right : 36px; font-size : 16;"><b>▢</b></button>'+
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
    content2.innerHTML = '<img src="c0c0nut.png" style="width : 100%; height : 100%">'
    tab_bar.insertBefore(content2,tab_bar.children[tab_bar.children.length-1]);

    console.log("Help me");
}
function disable_mouse()
{
    const webs = document.querySelectorAll(".webcontent");
    webs.forEach((entry) =>
    {
        entry.classList.add("click_disable");
    })
    console.log("Calling mouse diable.");
}
function enable_mouse()
{
    const webs = document.querySelectorAll(".webcontent");
    webs.forEach((entry) =>
    {
        entry.classList.remove("click_disable");
    })
    console.log("Calling mouse enable.");
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
}

function minimizeTab(id)
{
    const windo = document.getElementById(id);
    const back_button = document.getElementById(id+"_back");
    const forward_button = document.getElementById(id+"_forward");
    const min_button = document.getElementById(id+"_minimize");
    const webcont = document.getElementById(id+"_webcontent");
    const _input = document.getElementById(id+"_input");

    if(windo.classList.contains("minimized"))
    {
        windo.classList.remove("minimized");
        back_button.style.display = "initial";
        forward_button.style.display = "initial";
        min_button.innerHTML = "━";
        min_button.style.fontSize = 10;
        _input.style.display = "initial";
        webcont.style.display = "initial";
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
    }
}