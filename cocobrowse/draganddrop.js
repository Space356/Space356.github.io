var holding = 0;
var mouse_x = 0;
var mouse_y = 0;
var rel_mouse_x = 0;
var rel_mouse_y = 0;
var splitting = false;
var split_moving = false;
var split_window_left = 0;
var split_window_right = 0;

function initializeMove(id)
{
  if (holding == 0 && !maximized)
  {
    holding = document.getElementById(id);
    rel_mouse_x = mouse_x - parseFloat(holding.style.left);
    rel_mouse_y = mouse_y - parseFloat(holding.style.top);
    console.log("Move initialized.");
  }
}
function initializeSplitMove()
{
  split_moving = true;
  console.log("Move split init.");
  disable_mouse(0);
}
document.addEventListener("mousemove", function (Event)
{
  if (!maximized)
  {
    if(split_window_left == holding)
    {
      split_window_left = 0;
    }
    if(split_window_right == holding)
    {
      split_window_right = 0;
    }

    mouse_x = Event.clientX;
    mouse_y = Event.clientY;
    if (holding != 0) 
    {
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
    else if(split_moving)
    {
      const left_div = document.getElementById("split_left");
      const right_div = document.getElementById("split_right");

      let left_width = String(clamp(mouse_x,window.innerWidth*0.15,window.innerWidth*0.85))+"px";
      let right_width = String(clamp(window.innerWidth - mouse_x,window.innerWidth*0.15,window.innerWidth*0.85))+"px";
      left_div.style.width = left_width;
      right_div.style.width = right_width;
      split_bar.style.left = left_width;

      if(split_window_left != 0)
      {
          split_window_left.style.transition = "none";
          split_window_left.style.width = left_width;
          split_window_left.style.setProperty("--topagain", split_window_left.style.top);
          split_window_left.style.setProperty("--leftagain", split_window_left.style.left);
      }
      if(split_window_right != 0)
      {
          split_window_right.style.transition = "none";
          split_window_right.style.left = String(window.innerWidth - right_div.clientWidth)+"px";
          split_window_right.style.width = right_width;
          split_window_right.style.setProperty("--topagain", split_window_right.style.top);
          split_window_right.style.setProperty("--leftagain", split_window_right.style.left);
      }
    }
  }
});
document.addEventListener("mouseup", function ()
{
  const split_bar = document.getElementById("split_bar");
  if (holding != 0 && !maximized)
  {
    if(splitting)
    {
      console.log("Split");
      const left_div = document.getElementById("split_left");
      if(left_div.classList.contains("split_hover"))
      {
        /*holding.style.setProperty("--leftagain", "0px%");
        holding.style.left = "0px";
        holding.style.setProperty("width",left_div.style.width);*/
        //left_div.appendChild(holding);
        //holding.classList.add("maximized");
        holding.style.width = String(left_div.clientWidth)+"px";
        left_div.classList.remove("split_hover");

        split_window_left = holding;
      }

      const right_div = document.getElementById("split_right");
      if(right_div.classList.contains("split_hover"))
      {
        holding.style.left = String(window.innerWidth - right_div.clientWidth)+"px";
        /*holding.style.setProperty("--leftagain", holding.style.left);
        holding.style.setProperty("width",right_div.style.width);*/
        //right_div.appendChild(holding);
        //holding.classList.add("maximized");
        //holding.style.left = String(right_div.clientLeft)+"px";
        holding.style.width = String(right_div.clientWidth)+"px";
        right_div.classList.remove("split_hover");

        split_window_right = holding;
      }
      holding.style.top = "0px";
      holding.style.setProperty("--topagain", "0px");
      holding.style.height ="100%";
      splitting = false;
    }
    holding.style.setProperty("--topagain", holding.style.top);
    holding.style.setProperty("--leftagain", holding.style.left);
    console.log("Stopped Moving.");
    holding = 0;
  }
  if(split_moving)
  {
    split_moving = false;
    enable_mouse(0);
    if(split_window_left != 0)
    {
        split_window_left.style.transition = "all 0.3s ease";
    }
    if(split_window_right != 0)
    {
        split_window_right.style.transition = "all 0.3s ease";
    }
    //this is where the code for when you stop moving the split bar will be
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
});