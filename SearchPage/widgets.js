weather_string = '<iframe src="/weather_widget" scroll></iframe>';
widget_array =
[
    '',
    '<h1 class="time_text anims" name="time"></h1><br><h2 class="time_text font_smaller anims" name="datehtml"></h2><div style="position: absolute; bottom : 0px; width:100%; height:50%;">'+weather_string+'</div>',
    '<iframe src="/notebook/?transparent=yes"/>',
    '<iframe id="iframe_widget_left" src=""/>',
    'to-do list',
    '<iframe class="iframe_widget" id="iframe_widget_right" src=""/>'
];
option_array =
[
    '',
    'These are otions for time and weather.',
    'These are options for the notebook.',
    'URL: <input type="url" placeholder="url" id="iframe_url_left" onchange="set_iframe_url(\'left\')"><br>Zoom: <input type="range" min="0.1" max="2" step="0.1" value="0.65" id="iframe_zoom_left" onchange="set_iframe_url(\'left\')">',
    'These are options for the to-do list.',
    'URL: <input type="url" placeholder="url" id="iframe_url_right" onchange="set_iframe_url(\'right\')"><br>Zoom: <input type="range" min="0.1" max="2" step="0.1" value="0.65" id="iframe_zoom_right" onchange="set_iframe_url(\'right\')">'
]

function set_widget(side)
{
    const select = document.getElementById(side+"bar_select");
    const bar = document.getElementById("bar_"+side);
    const options = document.getElementById(side+"_options");

    bar.innerHTML = widget_array[select.value];
    options.innerHTML = option_array[select.value];
    localStorage.setItem(side+"_widget",select.value);
    if(select.value != 0)
    {
        if(bar.classList.contains("hidden"))
        {
            bar.classList.remove("hidden");
        }
    }
    else
    {
        if(!bar.classList.contains("hidden"))
        {
            bar.classList.add("hidden");
        }
    }
}
function load_widgets()
{
    //weather_string = document.getElementById("weatherwidget").innerHTML;

    const left_val = localStorage.getItem("left_widget");
    if(left_val != null)
    {
        document.getElementById("leftbar_select").value = left_val;
    }
    
    const right_val = localStorage.getItem("right_widget");
    if(right_val != null)
    {
        document.getElementById("rightbar_select").value = right_val;
    }
    set_widget("left");
    set_widget("right");

    load_iframe_urls();
}

function set_iframe_url(side)
{
    const iframe_url = document.getElementById("iframe_url_"+side).value;
    const iframe_zoom = document.getElementById("iframe_zoom_"+side).value;
    localStorage.setItem("iframe_widget_"+side,iframe_url);
    localStorage.setItem("iframe_zoom_"+side,iframe_zoom);
    const thing = document.getElementById("iframe_widget_"+side);
    thing.src = iframe_url;
    thing.style.zoom = iframe_zoom;
}
function load_iframe_urls()
{
    if(localStorage.getItem("left_widget") == 3)
    {
        let side = "left";
        let iframe_url = localStorage.getItem("iframe_widget_"+side);
        let iframe_zoom = localStorage.getItem("iframe_zoom_"+side);
        document.getElementById("iframe_url_"+side).value = iframe_url;
        document.getElementById("iframe_zoom_"+side).value = iframe_zoom;
        const thing = document.getElementById("iframe_widget_"+side);
        thing.src = iframe_url;
        thing.style.zoom = iframe_zoom;
    }

    if(localStorage.getItem("right_widget") == 5)
    {
        let side = "right";
        let iframe_url = localStorage.getItem("iframe_widget_"+side);
        let iframe_zoom = localStorage.getItem("iframe_zoom_"+side);
        document.getElementById("iframe_url_"+side).value = iframe_url;
        document.getElementById("iframe_zoom_"+side).value = iframe_zoom;
        const thing = document.getElementById("iframe_widget_"+side);
        thing.src = iframe_url;
        thing.style.zoom = iframe_zoom;
    }
}