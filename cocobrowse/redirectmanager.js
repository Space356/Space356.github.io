function interceptLinks(iframe)
{
    iframe.contentWindow.document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(event)
        {
            event.preventDefault();
            const url = this.href;
            AppendTab(url);
        });
    });
    console.log("interception called");
}