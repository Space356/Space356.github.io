var split_bar = document.getElementById("split_bar");
var split_moving = false;

split_bar.addEventListener("mousedown", function()
{
    split_moving = true;
    mouse_disable();
});
split_bar.addEventListener("mouseup", function()
{
    split_moving = false;
    mouse_enable();
});
split_bar.addEventListener("mousemove", function()
{
    if(split_moving)
    {
        const left_div = document.getElementById("left_div");
        const right_div = document.getElementById("right_div");

        left_div.style.width = split_bar.style.left;
        right_div.style.width = "calc("+String(window.innerWidth)+"px - "+split_bar.style.left+")";
        right_div.style.left = split_bar.style.left;
    }
});