// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getDatabase, ref, get, set, query, onChildAdded, orderByKey, limitToLast, push ,endBefore} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-database.js";
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

let latest_message = null;
let oldest_message = null;

onAuthStateChanged(auth, (user) =>
{
    if (user)
    {
        uid = user.uid;
        //add to members list
        get(ref(db, 'chats/' + chat_id)).then((snapshot) =>
        {
            if (snapshot.exists())
            {
                set(ref(db, 'chats/' + chat_id + '/members/' + uid), true); //Adds user to members list.
                set(ref(db, 'users/' + uid + '/cocochat/savedChats'), true); //Does saved chat thing.
                loadSavedChats();
            }
        }).catch((error) =>
        {
            console.error("Error adding user to members list: ", error);
        });
    }
    else
    {
        uid = "nada";
    }
    console.log("User ID: "+uid);
});

const send_button = document.getElementById('send_button');

let temp_id;
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.get("chatid") != null)
{
    temp_id = urlParams.get("chatid");
}
else
{
    temp_id = "12345678"; // default chat ID
}

let chat_id = temp_id; // make this changable later.

get(ref(db, 'chats/' + chat_id)).then((snapshot) =>
{
    if (snapshot.exists())
    {
        const chatData = snapshot.val();
        document.getElementById("title").value = chatData.name;
        console.log(chatData.name);

        console.log("Loading Members: ", chatData.members);
        const membersList = document.getElementById("members_list");
        membersList.innerHTML = ""; // Clear existing members
        for (const memberId in chatData.members)
        {
            get(ref(db, 'users/' + memberId)).then((userSnapshot) =>
            {
                if (userSnapshot.exists())
                {
                    const userData = userSnapshot.val();
                    const memberItem = document.createElement("li");
                    memberItem.innerText = userData.username || "Nada";
                    memberItem.style.color = userData.color || "#FFFFFF";
                    memberItem.style.fontWeight = "bold";
                    membersList.appendChild(memberItem);
                    console.log("Loaded member: ", userData.username);
                }
            });
        }
    }
    else
    {
        console.log("No chat data found.");
        chat_id = "12345678"; // reset to default chat ID if not found
        alert("Chat ID not found. Redirecting to default chat.");
        window.location.href = "index.html?chatid="+chat_id;
    }
}).catch((error) =>
{
    console.error("Error fetching chat data: ", error);
});

console.log("Chat ID: "+chat_id);

//load links to saved chats
function loadSavedChats()
{
    get(ref(db, 'users/' + uid + '/cocochat/savedChats')).then((snapshot) =>
    {
        if (snapshot.exists())
        {
            const savedChats = snapshot.val();
            const savedChatsList = document.getElementById("saved_chats_list");
            for (const chatKey in savedChats)
            {
                get(ref(db, 'chats/' + chatKey)).then((chatSnapshot) =>
                {
                    if (chatSnapshot.exists())
                    {
                        const chatData = chatSnapshot.val();
                        const chatLink = document.createElement("b");
                        chatLink.href = "index.html?chatid=" + chatKey;
                        chatLink.innerText = chatData.name;
                        const listItem = document.createElement("li");
                        listItem.addEventListener('click', () =>
                        {
                            window.location.href = "index.html?chatid=" + chatKey;
                        });
                        listItem.appendChild(chatLink);
                        savedChatsList.appendChild(listItem);
                        console.log("Loaded saved chat: ", chatData.name);
                    }
                });
            }
        }
        else
        {
            console.log("No saved chats found.");
        }
    }).catch((error) =>
    {
        console.error("Error fetching saved chats: ", error);
    });
}

//message sending
send_button.addEventListener("click", function(e)
{
    e.preventDefault();
    if(uid != "nada")
    {
        const message_input = document.getElementById("message_input")
        const message = profanityCleaner.clean(message_input.value.slice(0, 1000));

        if (message.trim() === "")
        {
            return; // Don't send empty messages
        }
        //push message to firebase
        set(push(ref(db, 'chats/'+chat_id+"/messages")), {
            message: message,
            user: uid,
            timestamp: Date.now()
        }).then(() =>
        {
            // Data saved successfully!
            console.log("Message sent!");
            message_input.value = "";
        })
        .catch((error) =>
        {
            // The write failed...
            console.error("Error sending message: ", error);
        })
    }
    else
    {
        alert("You must be logged in to send messages. Go here to do that: https://space356hosting.github.io/login/");
    }
});

const messageList = document.getElementById("message_list");


//message loading
const queriesRef = query(ref(db, 'chats/'+chat_id+"/messages"), orderByKey() ,limitToLast(40));

// Attach a listener to the query
/*get(queriesRef, (snapshot) =>
{
    if (snapshot.exists())
    {
        const recentQueries = snapshot.val();
        const orderedQueries = Object.values(recentQueries).reverse();
        console.log(orderedQueries);

        //latest_message = snapshot.firstChild.key;
        snapshot.forEach((childSnapshot) =>
        {
            oldest_message = childSnapshot.key;
            console.log("Iterating message key: ", childSnapshot.key);
        });
        console.log("Oldest message key: ", oldest_message);
        //console.log("Latest message key: ", latest_message);
        // You may need to reverse the order to display them chronologically
        /*const orderedQueries = Object.values(recentQueries).reverse();
        console.log(orderedQueries);
        // Clear the existing messages
        const messageList = document.getElementById("message_list");
        messageList.innerHTML = "";
        latest_message = orderedQueries[0].key;
            for (let i = 0; i < orderedQueries.length; i++)
            {
                const queryData = orderedQueries[i];
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
                    messageList.insertBefore(messageItem, messageList.firstChild);
                });
        }
    }
    else
    {
        console.log("No queries found.");
    }
});*/
onChildAdded(queriesRef, (data) =>
{
    const queryData = data.val();
    const messageItem = document.createElement("li");

    if (oldest_message === null)
    {
        oldest_message = data.key;
        console.log("Oldest message set to: ", oldest_message);
    }
    latest_message = data.key;
    console.log("New message added with key (Also latest message): ", latest_message);
    //get username from uid
    let username = "nada";
    let color = "#FFFFFF";
    get(ref(db, 'users/' + queryData.user)).then((snapshot) =>
    {
        if (snapshot.exists())
        {
            username = snapshot.val().username;
            color = snapshot.val().color;
            console.log(snapshot.val().username);
        }
        let scrollToBottom = false;
        if(messageItem.scrollTop + messageItem.clientHeight >= messageItem.scrollHeight)
        {
            scrollToBottom = true;
        }
        append_message(messageItem, username, color, queryData,true);

        if(scrollToBottom)
        {
            messageList.scrollTop = messageList.scrollHeight;
        }
    });
});

function loadOlderMessages()
{
    if (oldest_message === null)
    {
        console.log("No older messages to load.");
        return;
    }
    const olderMessagesRef = query(ref(db, 'chats/'+chat_id+"/messages"), orderByKey(), endBefore(oldest_message), limitToLast(40));
    get(olderMessagesRef).then((snapshot) =>
    {
        if (snapshot.exists())
        {
            const scrollHeightBefore = messageList.scrollHeight;
            const olderMessages = snapshot.val();
            const orderedMessages = Object.values(olderMessages).reverse();
            console.log(orderedMessages);
            // You may need to reverse the order to display them chronologically
            /*const orderedQueries = Object.values(recentQueries).reverse();
            console.log(orderedQueries);*/
            // Clear the existing messages
            //const messageList = document.getElementById("message_list");
            //messageList.innerHTML = "";
            oldest_message = Object.keys(olderMessages)[0];
            console.log("Oldest message key: ", oldest_message);
                for (let i = 0; i < orderedMessages.length; i++)
                {
                    const messageData = orderedMessages[i];
                    const messageItem = document.createElement("li");

                    //get username from uid
                    let username = "nada";
                    let color = "#FFFFFF";
                    get(ref(db, 'users/' + messageData.user)).then((snapshot) =>
                    {
                        if (snapshot.exists())
                        {
                            username = snapshot.val().username;
                            color = snapshot.val().color;
                            console.log(snapshot.val().username);
                        }
                        append_message(messageItem, username, color, messageData);
                        // Adjust scroll position to maintain view
                        messageList.scrollTop = messageList.scrollHeight - scrollHeightBefore;
                    });
            }
        }
        else
        {
            console.log("No older messages found.");
        }
    }).catch((error) =>
    {
        console.error("Error loading older messages: ", error);
    });
}
messageList.addEventListener("scroll", () =>
{
    console.log("Scroll position: ", messageList.scrollTop);
    if (messageList.scrollTop === 0)
    {
        console.log("Loading older messages.");
        loadOlderMessages();
    }
});

//title editing
const titleElement = document.getElementById("title");
titleElement.addEventListener("blur", () =>
{
    const newTitle = titleElement.value.slice(0,40).trim();
    if (newTitle.length > 0)
    {
        set(ref(db, 'chats/' + chat_id+"/name"),newTitle).then(() =>
        {
            console.log("Chat title updated to: ", newTitle);
        }).catch((error) =>
        {
            console.error("Error updating chat title: ", error);
        });
    }
});
titleElement.addEventListener("keydown", (e) =>
{
    if (e.key === "Enter")
    {
        e.preventDefault();
        titleElement.blur();
    }
});

function append_message(messageItem, username, color, messageData,at_end = false)
{
    //appends the message once the username is fetched
    const usernameDiv = document.createElement("div");
    usernameDiv.classList.add("username");
    usernameDiv.innerText = username+":";
    usernameDiv.style.color = color;
    messageItem.appendChild(usernameDiv);

    //appends message content
    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    messageContent.innerText = messageData.message;
    messageItem.appendChild(messageContent);

    //convert URLs to clickable links
    const urls = messageContent.innerText.match(/(https?:\/\/[^\s]+)/g);
    if(urls != null)
    {
        for(let i = 0; i < urls.length; i++)
        {
            console.log("URL: ", urls[i]);
            if(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/i.test(urls[i]))
            {
                messageContent.innerHTML = messageContent.innerText.replace(urls[i], '<a href="'+urls[i]+'" target="_blank"><img src="'+urls[i]+'" alt="Image" style="max-width:200px; max-height:200px;"></a>');
                continue;
            }
            else
            {
                messageContent.innerHTML = messageContent.innerText.replace(urls[i], '<a href="'+urls[i]+'" target="_blank">'+urls[i]+'</a>');
            }
        }
    }

    //adds timestamp
    const messageTime = document.createElement("div");
    messageTime.classList.add("chat-time");
    messageTime.innerText = new Date(messageData.timestamp).toLocaleString();
    messageItem.appendChild(messageTime);

    if(at_end)
    {
        messageList.appendChild(messageItem);
    }
    else
    {
        messageList.insertBefore(messageItem, messageList.firstChild);
    }
}