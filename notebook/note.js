function plus_hover_enter(id)
{
    const button = document.getElementById(id);
    if(!button.classList.contains("new_note_expand"))
    {
        document.getElementById(id).classList.add("new_note_hover");
    }
}
function plus_hover_leave(id)
{
    const button = document.getElementById(id);
    if(!button.classList.contains("new_note_expand"))
    {
        document.getElementById(id).classList.remove("new_note_hover");
    }
}

function open_add_menu(id)
{
    const button = document.getElementById(id);
    const nn_button = document.getElementById(id+"_nn");
    const ns_button = document.getElementById(id+"_ns");
    const plus_button = document.getElementById(id+"_plus");
    if(button.classList.contains("new_note_expand"))
    {
        button.classList.remove("new_note_expand");
        ns_button.tabIndex = -1;
        nn_button.tabIndex = -1;
        ns_button.style.pointerEvents = "none";
        nn_button.style.pointerEvents = "none";
        plus_button.classList.remove("new_note_plus_open");
    }
    else
    {
        button.classList.remove("new_note_hover");
        button.classList.add("new_note_expand");
        ns_button.tabIndex = 0;
        nn_button.tabIndex = 0;
        ns_button.style.pointerEvents = "all";
        nn_button.style.pointerEvents = "all";
        plus_button.classList.add("new_note_plus_open");
    }
}

function append_note(id)
{
    console.log("trying "+id);
    //id="n_0000" class="button_anims note" role="textbox" contenteditable
    const container = document.getElementById("scroll_area");
    let note = document.createElement("div");
    const rand_id = Math.floor(Math.random()*10000);
    console.log(rand_id);
    note.id = "n_"+String(rand_id);
    note.className = "button_anims note";
    note.role = "textbox";
    note.innerHTML = '<div class="handle" contenteditable="false">≡</div><div onclick="delete_note(\'n_'+String(rand_id)+'\')" class="delete" contenteditable="false">x</div><div id="tb_'+rand_id+'" class="fill" contenteditable="true">New Note</div>';
    container.insertBefore(note,document.getElementById(id));
    console.log("Made note with id "+note.id);

    open_add_menu(id); //closes the button
}
function append_section(id)
{
    console.log("trying "+id);
    const container = document.getElementById("scroll_area");
    
    const rand_id = Math.floor(Math.random()*10000);
    console.log(rand_id);

    /*<div id="b_0000" class="new_note">
        <button 
        class="new_note_plus" 
        id="b_0000_plus"
        onmouseenter="plus_hover_enter('b_0000')" 
        onmouseleave="plus_hover_leave('b_0000')"
        onclick="open_add_menu('b_0000')">+</button>
        <button onclick="append_note('b_0000')" tabindex="-1" id="b_0000_nn" class="button_anims new_note_expand_button" style="top: 8px; pointer-events: none;">New Note</button>
        <button tabindex="-1" id="b_0000_ns" class="button_anims new_note_expand_button" style="top: 48px; pointer-events: none;">New Section</button>
    </div>*/
    //make new button
    let new_button = document.createElement("div");
    new_button.id = "b_"+String(rand_id);
    new_button.className = "new_note";
    new_button.innerHTML = //Look down
        '<button class="new_note_plus" id="b_'+rand_id+'_plus" onmouseenter="plus_hover_enter(\'b_'+rand_id+'\')" onmouseleave="plus_hover_leave(\'b_'+rand_id+'\')" onclick="open_add_menu(\'b_'+rand_id+'\')">+</button>'+
        '<button onclick="append_note(\'b_'+rand_id+'\')" tabindex="-1" id="b_'+rand_id+'_nn" class="button_anims new_note_expand_button" style="top: 8px; pointer-events: none;">New Note</button>'+
        '<button onclick="append_section(\'b_'+rand_id+'\')" tabindex="-1" id="b_'+rand_id+'_ns" class="button_anims new_note_expand_button" style="top: 48px; pointer-events: none;">New Section</button>'
    container.insertBefore(new_button,document.getElementById(id));
    console.log("Made button with id "+new_button.id);

    //make break
    let sect_break = document.createElement("div");
    sect_break.id = "s_"+String(rand_id);
    sect_break.className = "break";
    sect_break.innerHTML = '<div class="eek"></div><div onclick="delete_sect(\''+rand_id+'\')" class="delete_sect">X</div>'
    container.insertBefore(sect_break,document.getElementById(id));
    console.log("Made break with id "+sect_break.id);

    open_add_menu(id); //closes the button
}

function on_note_load()
{
    const container = document.getElementById("scroll_area");
    new Sortable(container,
    {
        handle : ".note",
        ghostClass: 'ghost',
        animation: 0.1,
        onEnd: function(evt)
        {
            let nonSortableItems = Array.from(container.querySelectorAll(".new_note"));

            for(let i=0;i<nonSortableItems.length;i++)
            {
                let b_index = Array.from(container.children).indexOf(nonSortableItems[i]);
                let n_index = Array.from(container.children).indexOf(evt.item);

                if(n_index == b_index+1)
                {
                    container.insertBefore(evt.item, nonSortableItems[i]);
                    return false;
                }
            }
        }
    });
}

function delete_note(id)
{
    document.getElementById(id).remove();
}
function delete_sect(id)
{
    document.getElementById("s_"+id).remove();
    document.getElementById("b_"+id).remove();
}