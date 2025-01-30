widget_array =
[
    '',
    '<h1 class="time_text" id="time"></h1><br><h2 class="time_text font_smaller" id="datehtml"></h2>',
    'notebook',
    'iframe',
    'to-do list'
];

function set_widget(side)
{
    const select = document.getElementById(side+"bar_select");
    const bar = document.getElementById("bar_"+side);

    bar.innerHTML = widget_array[select.value];
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