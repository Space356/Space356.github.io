var itemInput = document.getElementById('new-item-input');
var listos = document.getElementById('dynamic-list');

function addItem()
{
  var value = itemInput.value.trim();
  if (value)
  {
    var listItem = document.createElement("li");
    listItem.textContent = value;
    listos.insertBefore(listItem, listos.firstChild);
    itemInput.value = "";
  }
}
itemInput.addEventListener('keydown', function(event)
{
  if (event.key === 'Enter')
  {
    addNewItem();
  }
});

function openNewTab()
{
  window.open("https://space356.github.io/MultMass", '_blank');
}