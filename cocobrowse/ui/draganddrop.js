var holding = 0;
var mouse_x = 0;
var mouse_y = 0;
var rel_mouse_x = 0;
var rel_mouse_y = 0;
function initializeMove(id)
{
  if(holding == 0 && !maximized)
  {
    holding = document.getElementById(id);
    rel_mouse_x = mouse_x - parseFloat(holding.style.left);
    rel_mouse_y = mouse_y - parseFloat(holding.style.top);
    console.log("Move initialized.");
  }
}
document.addEventListener("mousemove", function(Event)
{
  if(!maximized)
  {
    mouse_x = Event.clientX;
    mouse_y = Event.clientY;
    if(holding != 0)
    {
      holding.style.left = String(clamp(mouse_x - rel_mouse_x, 4, window.innerWidth-holding.clientWidth) - 4)+"px";
      holding.style.top = String(clamp(mouse_y - rel_mouse_y, 4, window.innerHeight-holding.clientHeight) - 4)+"px";
      console.log("Moving.");
    }
  }
});
document.addEventListener("mouseup", function()
{
    if(holding != 0 && !maximized)
    {
      holding.style.setProperty("--topagain", holding.style.top);
      holding.style.setProperty("--leftagain", holding.style.left);
      console.log("Stopped Moving.");
      holding = 0;
    }
});