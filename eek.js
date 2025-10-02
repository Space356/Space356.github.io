function loadUserTab()
{
    fetch('/login/UserTabManager.js')
    .then(response => response.text())
    .then(scriptContent =>
    {
        const script = document.createElement('script');
        script.textContent = scriptContent;
        script.type = 'module';
        document.body.appendChild(script);
    })
    .catch(error => console.error('Error fetching script:', error));

    console.log("loadUserTab function executed");
}

fetch("/login/AccountTab.html")
.then(response => response.text())
.then(data => {
    const div = document.getElementById('accounttab');
    div.innerHTML = data;
    loadUserTab();
})
.catch(error => console.error('Error loading tab:', error));