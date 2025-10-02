const inst = document.querySelectorAll('.bigboi')

const observer = new IntersectionObserver((entries) =>
{
    entries.forEach((entry) =>
    {
        if (entry.isIntersecting)
        {
            entry.target.classList.add('scroll-animation')
        }
        else
        {
            entry.target.classList.remove('scroll-animation')
        }
    })
},
{
    threshold: 0.5
});
  for (var i = 0; i < inst.length; i++)
  {
      const elements = inst[i];
      observer.observe(elements);
  } 

fetch('/login/AccountTab.html')
.then(response => response.text())
.then(data => {
    document.getElementById('accounttab').innerHTML = data;
})
.catch(error => console.error('Error loading tab:', error));