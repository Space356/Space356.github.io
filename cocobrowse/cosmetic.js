var base64String = "";

function apply_cosmetic()
{
    // Get the root element
    const root = document.querySelector(':root');
    const accent_select = document.getElementById("accent_select");
    const text_select = document.getElementById("text_select");

    // Change the value of the --main-color variable
    root.style.setProperty('--accent-color', accent_select.value);
    root.style.setProperty('--text-color', text_select.value);
    root.style.setProperty('--accent-rgb', rgb_convert(accent_select.value));
    root.style.setProperty('--text-rgb', rgb_convert(text_select.value));

    //if(base64String != "")
    //{
        const wallpaper_preview = document.getElementById("wallpaper_preview");
        const wallpaper = document.getElementById("wallpaper");
        localStorage.setItem('uploadedImage',base64String);
        wallpaper.src = wallpaper_preview.src;
    //}
}
function rgb_convert(col)
{
    const r = parseInt(col.slice(1, 3), 16);
    const g = parseInt(col.slice(3, 5), 16);
    const b = parseInt(col.slice(5, 7), 16);
    return String(r)+", "+String(g)+", "+String(b);
}

async function change_background()
{
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();

    const arrayBuffer = await file.arrayBuffer();
    base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const uploaded_file = URL.createObjectURL(file);

    document.getElementById("wallpaper_preview").src = uploaded_file;
}