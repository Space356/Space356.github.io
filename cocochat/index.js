// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase, ref, get, set, query, limitToLast, onValue } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-eEqmJtqVS23-rHE3HU7AX3aeGtpESUQ",
    authDomain: "space356hosting.firebaseapp.com",
    databaseURL: "https://space356hosting-default-rtdb.firebaseio.com",
    projectId: "space356hosting",
    storageBucket: "space356hosting.firebasestorage.app",
    messagingSenderId: "820898636587",
    appId: "1:820898636587:web:a15b2bad3b9b67fe111b6e",
    measurementId: "G-MJ0V1SD67P"
};

// Initialize Firebase
//Globally. Don't know if this is a good way to do this.
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

let uid = "nada";
onAuthStateChanged(auth, (user) =>
{
    if (user)
    {
        uid = user.uid;
    }
    console.log("User ID: "+uid);
});

const send_button = document.getElementById('send_button');

const chat_id = "12345678"; // make this changable later.

console.log("Chat ID: "+chat_id);
send_button.addEventListener("click", function(e)
{
    e.preventDefault();
    const message_input = document.getElementById("message_input")
    const message = message_input.value;
    set(ref(db, 'chats/'+chat_id+"/messages/" + Date.now()), {
        message: message,
        user: uid,
    }).then(() => {
        // Data saved successfully!
        console.log("Message sent!");
        message_input.value = "";
    })
    .catch((error) => {
        // The write failed...
        console.error("Error sending message: ", error);
    })
});

//message loading
const queriesRef = query(ref(db, 'chats/'+chat_id+"/messages/"), limitToLast(20));

// Attach a listener to the query
onValue(queriesRef, (snapshot) =>
{
    if (snapshot.exists())
    {
        const recentQueries = snapshot.val();
        const orderedQueries = Object.values(recentQueries);
        console.log(orderedQueries);
        // You may need to reverse the order to display them chronologically
        /*const orderedQueries = Object.values(recentQueries).reverse();
        console.log(orderedQueries);*/
        // Clear the existing messages
        const messageList = document.getElementById("message_list");
        messageList.innerHTML = "";
            for (let i = 0; i < orderedQueries.length; i++)
            {
                const queryData = orderedQueries[i];
                const messageList = document.getElementById("message_list");
                const messageItem = document.createElement("li");

                //get username from uid
                let username = "nada";
                get(ref(db, 'users/' + queryData.user)).then((snapshot) =>
                {
                    if (snapshot.exists())
                    {
                        username = snapshot.val().username;
                        console.log(snapshot.val().username);
                    }
                    //appends the message once the username is fetched
                    messageItem.innerText = username+": "+queryData.message;
                    messageList.appendChild(messageItem);
                });
        }
    }
    else
    {
        console.log("No queries found.");
    }
});