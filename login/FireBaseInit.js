// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase, ref, get, set} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
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

const sub_button = document.getElementsByName('submit')[0];

sub_button.addEventListener('click', function(e)
{
    e.preventDefault();
    //const data = new FormData(form);
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;
    const pass2 = document.getElementById("password2").value;
    const register = document.getElementById("register").checked;

    const data_obj =
    {
        email : email,
        password : pass,
        password2 : pass2
    };
    console.log(register);
    if(register)
    {
        /*get(ref(db, 'users/' + data_obj.name)).then((snapshot) =>
        {
            if (snapshot.exists())
            {
                console.log(snapshot.val());
                alert("Username either invalid, or exists already.");
            }
            else
            {
                console.log("Name does not exist, therefore new account is being made.");
                if(data_obj.password == data_obj.password2)
                {
                    alert("Successful account thing.");
                    set(ref(db, 'users/' + data_obj.name),
                    {
                        password : data_obj.password,
                        storage : "nada"
                    });
                }
                else
                {
                    alert("Passwords don't match");
                }
            }
        });*/
        if(data_obj.password == data_obj.password2)
        {
            signUp();
        }
        else
        {
            alert("Passwords don't match");
        }
    }
    else
    {
        logIn();
    }
});

// Authentication functions
function signUp()
{
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) =>
    {
      const user = userCredential.user;

      //initialize the database data
      set(ref(db, 'users/' + user.uid),
      {
        username : generate_name(),
        notebook : "pending",
        cocobrowse : "pending",
        cocochat : "pending"
      });
      alert('Sign Up Successful:', user);
      //window.location.href = "/login/AccountTab.html";
    }).catch((error) => 
    {
      alert('Error signing up:', error.message);
    });
    
}

function logIn()
{
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password).then((userCredential) =>
    {
      const user = userCredential.user;
      console.log('Log In Successful:', user);
      window.location.href = "/login/AccountTab.html";
    }).catch((error) =>
    {
      alert('Error logging in:', error.message);
    });
}