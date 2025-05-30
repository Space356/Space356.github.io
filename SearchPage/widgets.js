weather_string = '<iframe src="/weather_widget" scroll></iframe>';
widget_array =
[
    '',
    '<h1 class="time_text anims" name="time"></h1><br><h2 class="time_text font_smaller anims" name="datehtml"></h2><div style="position: absolute; bottom : 0px; width:100%; height:50%;">'+weather_string+'</div>',
    '<iframe src="/notebook/?transparent=yes"/>',
    'iframe',
    'to-do list'
];
option_array =
[
    '',
    'These are otions for time and weather.',
    'These are options for the notebook.',
    'These are options for the iframe.',
    'These are options for the to-do list.'
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
}