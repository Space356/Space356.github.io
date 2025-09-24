import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase, ref, get, set} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";

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

const sign_out_button = document.getElementById("sign_out");

onAuthStateChanged(auth, (user) =>
{
    if (user)
    {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        get(ref(db, 'users/' + uid)).then((snapshot) =>
        {
            if (snapshot.exists())
            {
                console.log("User is signed in: " + uid);
                console.log(snapshot.val());
                document.getElementById("curr_user").innerHTML = "<h1>"+snapshot.val().username+"</h1><h2>"+user.email+"</h2>";
            }
        });
    }
    else
    {
        // User is signed out
        console.log("Signed Out");
        document.getElementById("curr_user").innerHTML = "<h1>Not Signed In</h1>";
        sign_out_button.innerHTML = "Log In";
    }
});

sign_out_button.addEventListener('click', function(e)
{
    e.preventDefault();
    auth.signOut().then(() =>
    {
        // Sign-out successful.
        console.log("Signed Out");
        document.getElementById("curr_user").innerHTML = "<h1>Not Signed In</h1>";
        sign_out_button.innerHTML = "Log In";
    }).catch((error) =>
    {
        // An error happened.
        console.log("Error signing out: "+error);
    });
});