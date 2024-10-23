var holding = 0;
var mouse_x = 0;
var mouse_y = 0;
var rel_mouse_x = 0;
var rel_mouse_y = 0;
var splitting = false;
function initializeMove(id)
{
  if (holding == 0 && !maximized) {
    holding = document.getElementById(id);
    rel_mouse_x = mouse_x - parseFloat(holding.style.left);
    rel_mouse_y = mouse_y - parseFloat(holding.style.top);
    console.log("Move initialized.");
  }
}
document.addEventListener("mousemove", function (Event)
{
  if (!maximized) {
    mouse_x = Event.clientX;
    mouse_y = Event.clientY;
    if (holding != 0) {
      holding.style.left = String(clamp(mouse_x - rel_mouse_x, 4, window.innerWidth - holding.clientWidth) - 4) + "px";
      holding.style.top = String(clamp(mouse_y - rel_mouse_y, 4, window.innerHeight - holding.clientHeight) - 4) + "px";
      console.log("Moving.");

      if (mouse_x < 64 )
      {
        if(!splitting)
        {
          const left_div = document.getElementById("split_left");
          left_div.classList.add("split_hover");
          splitting = true;
        }
      }
      else if (mouse_x > window.innerWidth - 64)
      {
        if(!splitting)
        {
          const right_div = document.getElementById("split_right");
          right_div.classList.add("split_hover");
          splitting = true;
        }
      }
      else if(splitting)
      {
        const left_div = document.getElementById("split_left");
        left_div.classList.remove("split_hover");

        const right_div = document.getElementById("split_right");
        right_div.classList.remove("split_hover");
        splitting = false;
      }
    }
  }
});
document.addEventListener("mouseup", function ()
{
  if (holding != 0 && !maximized)
  {
    holding.style.setProperty("--topagain", holding.style.top);
    holding.style.setProperty("--leftagain", holding.style.left);
    console.log("Stopped Moving.");

    if(splitting)
    {
      console.log("Split");
      const left_div = document.getElementById("split_left");
      if(left_div.classList.contains("split_hover"))
      {
        holding.style.left = "0px";
        holding.style.setProperty("width",left_div.style.width);
        left_div.classList.remove("split_hover");
      }

      const right_div = document.getElementById("split_right");
      if(right_div.classList.contains("split_hover"))
      {
        holding.style.left = String(window.innerWidth - right_div.clientWidth-4)+"px";
        holding.style.setProperty("width",right_div.style.width);
        right_div.classList.remove("split_hover");
      }
      holding.style.top = "0px";
      holding.style.setProperty("max-height", "99.5%");
      holding.style.setProperty("max-width", "99%");
      holding.style.setProperty("height","100%");
      splitting = false;
    }
    holding = 0;
  }
});