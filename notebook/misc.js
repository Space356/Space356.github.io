function update_title()
{
    document.getElementById("html_title").innerHTML = document.getElementById("title").value;
}

function open_new_notebook()
{
    let rand_id;
    do
    {
        rand_id = Math.floor(Math.random()*10000);
    }
    while(data.projects[rand_id] !== undefined);

    //transparency
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get("transparent") === "yes")
    {
        window.location = "/notebook/note.html?nbid="+rand_id+"&transparent=yes";
    }
    else
    {
        window.location = "/notebook/note.html?nbid="+rand_id;
    }
}
function return_to_homepage()
{
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get("transparent") === "yes")
    {
        window.location = "/notebook/?transparent=yes";
    }
    else
    {
        window.location = "/notebook/;"
    }
}

function apply_doc_scales()
{
    //loads the button animations and crap that are initialized with the document.
    document.querySelectorAll(".button_anims").forEach(button =>
    {
        let width = button.offsetWidth;
        let height = button.offsetHeight;
        let scaleX = (width + 8) / width;
        let scaleY = (height + 8) / height;

        button.style.setProperty("--scale-factor-x", scaleX);
        button.style.setProperty("--scale-factor-y", scaleY);

        console.log(button);
    });
}

function apply_element_scales(id)
{
    element = document.getElementById(id);
    let width = element.offsetWidth;
    let height = element.clientHeight;
    let scaleX = (width + 8) / width;
    let scaleY = (height + 8) / height;

    element.style.setProperty("--scale-factor-x", scaleX);
    element.style.setProperty("--scale-factor-y", scaleY);
}