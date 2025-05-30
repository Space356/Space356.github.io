var data =
{
    projects : {}
}
var notebook_id = "";
var template_project_data = JSON.stringify(
{
    name : "",
    note_array : []
}); //Makes it a string to parse later when saving. Prevents editing of the template when saving.

var save_timer = null;
//"Why do we goonify our worth?" - Tyler's Chromebook

function save_notebook()
{
    if(notebook_id !== null && notebook_id !== "")
    {
        let elements = Array.from(document.getElementById("scroll_area").children);
        let curr_proj_data = JSON.parse(template_project_data); //prevents editing of the actual template.
        elements.forEach(element => 
        {
            switch(element.id.charAt(0))
            {
                case "n":
                    let note_data = element.children[2].innerHTML;
                    curr_proj_data.note_array.push(note_data);
                break;
                case "s":
                    curr_proj_data.note_array.push("HOLYHECKTHISISASECTION");
                break;
            }
        });

        curr_proj_data.name = document.getElementById("title").value;

        console.log(curr_proj_data);
        data.projects[notebook_id] = curr_proj_data;
        localStorage.setItem("notebook",JSON.stringify(data));
        console.log("saved "+notebook_id);
    }
    else
    {
        alert("Can't save notebook. (Missing ID)");
    }
}

function load_notebook()
{
    let gotten = localStorage.getItem("notebook");
    if(gotten === null || gotten === "")
    {
        localStorage.setItem("notebook",JSON.stringify(data));
    }
    else
    {
        data = JSON.parse(gotten);
    }
    const urlParams = new URLSearchParams(window.location.search);

    notebook_id = urlParams.get("nbid");
    if(urlParams.get("transparent") === "yes")
    {
        document.documentElement.style.setProperty("--body-color","#FF000000");
    }
    if(data.projects[notebook_id] !== undefined)
    {
        console.log("loading "+notebook_id);
        let proj_data = data.projects[notebook_id];
        console.log(proj_data);

        proj_data.note_array.forEach(i =>
        {
            if(i === "HOLYHECKTHISISASECTION")
            {
                append_section("b_0000");
            }
            else
            {
                let temp_note = append_note("b_0000",false);
                temp_note.children[2].innerHTML = i;
                //apply_element_scales(temp_note.id);
            }
        });

        document.getElementById("title").value = proj_data.name;
        document.getElementById("html_title").innerHTML = proj_data.name;
    }
    else if(notebook_id !== null && notebook_id !== "")
    {
        //makes a new notebook, cuz yeah.
        console.log("Making new notebook with id "+notebook_id);
        /*apply_element_scales(*/append_note("b_0000")/*.id)*/;
        save_notebook();
    }
    else
    {
        alert("Error, missing ID. (The URL is probably wrong)");
    }

    apply_doc_scales();
}

function load_projects()
{
    const urlParams = new URLSearchParams(window.location.search);
    const trans = urlParams.get("transparent") === "yes";

    const container = document.getElementById("scroll_area");

    let gotten = localStorage.getItem("notebook");
    if(gotten === null || gotten === "")
    {
        localStorage.setItem("notebook",JSON.stringify(data));
        console.log("Initialized Save Data.");
    }
    else
    {
        data = JSON.parse(gotten);
    }

    project_names = Object.keys(data.projects);
    project_names.forEach(i =>
    {
        let proj = document.createElement("a");
        proj.className = "note_button button_anims";
        proj.id = "p_"+i;
        const name = data.projects[i].name;
        if(name !== "")
        {
            proj.innerHTML = '<div onclick="event.preventDefault();delete_project(\''+i+'\')" class="delete" contenteditable="false">x</div><div class="scaler">'+name+'</div>';
        }
        else
        {
            proj.innerHTML = '<div onclick="event.preventDefault();delete_project(\''+i+'\')" class="delete" contenteditable="false">x</div><div class="scaler">Untitled Notebook</div>';
        }
        if(trans)
        {
            proj.href = "/notebook/note.html?nbid="+i+"&transparent=yes";
        }
        else
        {
            proj.href = "/notebook/note.html?nbid="+i;
        }

        container.appendChild(proj);
    });

    apply_doc_scales();

    //transparency
    if(trans)
    {
        document.documentElement.style.setProperty("--body-color","#FF000000");
    }
}

function save_reset_timer()
{
    //This is done after 2 seconds so it doesn't save like every milisecond when editing stuff.
    if(save_timer != null)
    {
        clearTimeout(save_timer);
    }
    save_timer = setTimeout(() =>
    {
        save_notebook();
    },2000);
}