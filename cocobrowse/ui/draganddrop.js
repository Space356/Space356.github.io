var holding = 0;
var mouse_x = 0;
var mouse_y = 0;
var rel_mouse_x = 0;
var rel_mouse_y = 0;
function initializeMove(id)
{
  if(holding == 0)
  {
    holding = document.getElementById(id);
    rel_mouse_x = mouse_x - parseFloat(holding.style.left);
    rel_mouse_y = mouse_y - parseFloat(holding.style.top);
    tab_array.splice(tab_array.indexOf(id),1);
    tab_array.push(id);
    for (var i=0; i<tab_array.length; i++)
    {
        var tab = document.getElementById(tab_array[i]);
        tab.style.zIndex = 50+i;
        console.log("Set "+String(tab_array[i])+" to z value "+String(tab.style.zIndex));
    }
  }
  console.log(tab_array);
  console.log("Move initialized.");
}
document.addEventListener("mousemove", function(Event)
{
  mouse_x = Event.clientX;
  mouse_y = Event.clientY;
  if(holding != 0)
  {
    holding.style.left = String(clamp(mouse_x - rel_mouse_x, 4, window.innerWidth-holding.clientWidth) - 4)+"px";
    holding.style.top = String(clamp(mouse_y - rel_mouse_y, 4, window.innerHeight-holding.clientHeight) - 4)+"px";
    console.log("Moving.");
  }
});
document.addEventListener("mouseup", function()
{
    if(holding != 0)
    {
      holding.style.setProperty("--topagain", holding.style.top);
      holding.style.setProperty("--leftagain", holding.style.left);
      console.log("Stopped Moving.");
      holding = 0;
    }
});