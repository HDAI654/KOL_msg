const API_URL = 'https://67d54ef7d2c7857431effb81.mockapi.io/api/kol-msg-messages/messages';

// Store messages in a global array
let messagesList = [];

// Function to get the current time
function getCurrentTime() {
    // Create a new Date object to get the current date and time
    const now = new Date();

    // Get the current hours and minutes
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Determine if it's AM or PM based on the hour
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12; // Modulo operation to convert 24-hour to 12-hour format
    hours = hours ? hours : 12; // If hours is 0 (midnight), set it to 12

    // Add a leading zero to minutes if it's less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Combine hours, minutes, and AM/PM into the desired format
    const timeString = `${hours}:${minutes} ${ampm}`;

    // Return the formatted time string
    return timeString;
}

// Get cookies
function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.split('=')[1];
        }
    }
    return null;
}

const username = getCookie('username');
const loginToken = getCookie('login');

// Check cookie validity
if (!username || loginToken !== "$vG8!z@Qm#L4W^bP2*rT1o%K7y&X3dJ9CqZ5M(N)6F+U") {
    window.location.href = 'login.html';
}

// Add message to the chat box (without clearing existing messages)
function addMessageToPage(msg) {
    // delete old sending status message
    const oldSendingStatus = document.getElementById('sending-msg');
    if (oldSendingStatus) {
        oldSendingStatus.remove();
    }

    // Create message element and add it to the chat box
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(msg.user === username ? 'user' : 'other');
    messageElement.innerHTML = `<strong>${msg.user}</strong> <br> ${msg.text} <br> <div class="time"><span>${msg.time}</span><div>`;
    
    chatBox.appendChild(messageElement);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}


// Load messages from API (only add new messages)
async function loadMessages() {
    try {
        const response = await fetch(API_URL);
        const newMessages = await response.json();

        // 🔥 Find new messages (compare with messagesList)
        const latestMessages = newMessages.filter(msg =>
            !messagesList.some(existingMsg => existingMsg.id === msg.id)
        );

        if (latestMessages.length === 0) {
            return;
        }else{
            // 🔥 Add only new messages
            latestMessages.forEach(msg => {
                messagesList.push(msg); // Save to list
                addMessageToPage(msg); // Display in chat
            });
        }

        
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

// Add a sending status message to page
function addSendingMsg(msg) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.setAttribute('id', 'sending-msg');
    messageElement.classList.add('message');
    messageElement.classList.add('user');
    messageElement.innerHTML = `<strong>Sending...</strong> <br> ${msg.text} <br> <div class="time"><span>...</span><div>`;
    chatBox.appendChild(messageElement);

    // Scroll to bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Send new message
async function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const text = messageInput.value.trim();

    if (text !== '') {
        const newMessage = { user: username, text: text, time: getCurrentTime()};
        messageInput.value = '';

        // Add a sending status message to page
        addSendingMsg(newMessage);

        try {
            // Delete the first message from server if the messages in more than 99
            if (messagesList.length > 99) {
                const deleteURL = `${API_URL}/${messagesList[0].id}`;
                await fetch(deleteURL, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messagesList[0])
                });
                messagesList.shift();
            }


            // Send message to server
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            });

            const savedMessage = await response.json();
            
            // Add new message to list
            messagesList.push(savedMessage);
            addMessageToPage(savedMessage);

        } catch (error) {
            // delete old sending status message
            const oldSendingStatus = document.getElementById('sending-msg');
            if (oldSendingStatus) {
                oldSendingStatus.remove();
            }
            // Scroll to bottom
            chatBox.scrollTop = chatBox.scrollHeight;
            console.error('Failed to send message:', error);
        }
    }
}

// Load messages on startup and refresh every 1 second
window.onload = async () => {
    await loadMessages(); // Initial load
    setInterval(loadMessages, 1000); // Fetch new messages every 1 second
};
