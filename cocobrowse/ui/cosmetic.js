function change_background()
{
    
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
}