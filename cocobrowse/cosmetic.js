function change_background()
{
    const input = document.getElementById("wallpaper_input");
    const wallpaper = document.getElementById("wallpaper");
    let file = URL.createObjectURL(input.files[0]);
    wallpaper.src = file.name;
}
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

    change_background();
}
function rgb_convert(col)
{
    const r = parseInt(col.slice(1, 3), 16);
    const g = parseInt(col.slice(3, 5), 16);
    const b = parseInt(col.slice(5, 7), 16);
    return String(r)+", "+String(g)+", "+String(b);
}