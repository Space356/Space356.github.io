var data =
{
    projects : {}
}
var notebook_id = "";
var template_project_data = 
{
    name : "",
    note_array : []
}

//"Why do we goonify our worth?" - Tyler's Chromebook

function save_notebook()
{
    if(notebook_id !== null)
    {
        let elements = Array.from(document.getElementById("scroll_area").children);
        let curr_proj_data = template_project_data;
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
    if(localStorage.getItem("notebook") === null)
    {
        localStorage.setItem("notebook",JSON.stringify(data));
    }
    else
    {
        data = JSON.parse(localStorage.getItem("notebook"));
    }
    const urlParams = new URLSearchParams(window.location.search);

    notebook_id = urlParams.get("nbid");
    if(data.projects[notebook_id] !== undefined)
    {
        console.log("loading "+notebook_id);
        let proj_data = data.projects[notebook_id];
        console.log(proj_data);
        //gotta get rid of the placeholder
        document.getElementById("n_0000").remove();

        proj_data.note_array.forEach(i =>
        {
            if(i === "HOLYHECKTHISISASECTION")
            {
                append_section("b_0000");
            }
            else
            {
                let temp_note = append_note("b_0000");
                temp_note.children[2].innerHTML = i;
            }
        });
    }
    else if(notebook_id !== null)
    {
        //makes a new notebook, cuz yeah.
        console.log("Making new notebook with id "+notebook_id);
        save_notebook();
    }
    else
    {
        alert("Error, missing ID. (The URL is probably wrong)");
    }
}

function load_projects()
{
    data = JSON.parse(localStorage.getItem("notebook"));
}