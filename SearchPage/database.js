var db;
var request = indexedDB.open("ImageDB", 1);

request.onupgradeneeded = function(event)
{
    db = event.target.result;
    let objectStore = db.createObjectStore("images", { keyPath: "id" });
};

request.onsuccess = function(event)
{
    db = event.target.result;
    console.log("Database initialized!");
};

//lskakfk
function storeImage(id, base64Data)
{
    let transaction = db.transaction(["images"], "readwrite");
    let objectStore = transaction.objectStore("images");
    let request = objectStore.add({ id: id, data: base64Data });

    request.onsuccess = function() {
        console.log("Image stored successfully!");
    };

    request.onerror = function() {
        console.error("Error storing image.");
    };
}

//lskdfkjlkasfv
function getImage(id, callback)
{
    let transaction = db.transaction(["images"], "readonly");
    let objectStore = transaction.objectStore("images");
    let request = objectStore.get(id);

    request.onsuccess = function() {
        if (request.result) {
            callback(request.result.data);
        } else {
            console.error("Image not found.");
        }
    };
}
