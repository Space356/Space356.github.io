var registering = false;

function toggle_register_page()
{
    const toggle = document.getElementById("register").checked;
    document.getElementById("password2").hidden = !toggle;
    document.getElementById("confirm").hidden = !toggle;
    registering = toggle;
    console.log(toggle);
}

function generate_name()
{
    const first_names = ["John","Fred","Eric","Hank","Franklin","Cornelius","Anthony","Tyler","Coco","Michael","Dave"];
    const last_names = ["Concrete","Cornwall","Combustion","Microwave","Leaves","White","Penumbra","John","Planter","Mechanism","The Absorber","The Destructive","The Lost","The Orange","The Third","The First","The Second","The Soul","The Stable","The Unstable"];
    return (first_names[Math.floor(Math.random()*first_names.length)]+" "+last_names[Math.floor(Math.random()*last_names.length)]);
}