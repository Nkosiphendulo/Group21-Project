// Global variable to store the selected font size
let userSelectedFontSize = 30; // Default font size

// Function to adjust the font size dynamically
function adjustFontSize(size) {
    const chatOutput = document.getElementById('chat-output');
    if (chatOutput) {
        chatOutput.style.fontSize = size + 'px';

        const userMessages = chatOutput.getElementsByClassName('message-bubble');
        for (let i = 0; i < userMessages.length; i++) {
            userMessages[i].style.fontSize = size + 'px';
        }
    }
}

// Function to add chat messages with the selected font size applied
function addChatMessage(sender, message) {
    const chatOutput = document.getElementById('chat-output');
    if (chatOutput) {
        const messageElement = document.createElement('div');
        messageElement.className = `message-container ${sender}`;

        const profileImage = document.createElement('img');
        profileImage.src = sender === 'user' ? '../Pictures/R.png' : '../Pictures/Chatbot.jpeg'; 
        profileImage.className = 'profile-pic';

        const messageBubble = document.createElement('div');
        messageBubble.className = 'message-bubble';
        messageBubble.textContent = message;

        // Apply the selected font size to the new message
        messageBubble.style.fontSize = userSelectedFontSize + 'px';

        messageElement.appendChild(profileImage);
        messageElement.appendChild(messageBubble);

        chatOutput.appendChild(messageElement);
        chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to the bottom
    }
}

// Function to send a message
function sendMessage() {
    const userInput = document.getElementById('chat-input').value.trim();
    if (userInput !== '') {
        document.getElementById('chat-input').value = '';
        addChatMessage('user', userInput);
        handleChat(userInput);
    }
}

// Function to show typing indicator
function showTypingIndicator() {
    const chatOutput = document.getElementById('chat-output');
    if (chatOutput) {
        const typingElement = document.createElement('p');
        typingElement.className = 'typing-indicator';
        typingElement.textContent = 'Typing...';

        chatOutput.appendChild(typingElement);
        chatOutput.scrollTop = chatOutput.scrollHeight;

        return typingElement; // Return the element to remove it later
    }
}

// Function to handle chat responses
function handleChat(userInput) {
    const response = respond(userInput);

    // Show typing indicator
    const typingElement = showTypingIndicator();

    // Simulate delay before bot responds
    setTimeout(() => {
        if (typingElement) {
            typingElement.remove(); // Remove typing indicator
        }
        addChatMessage('bot', response);
    }, 3000); // 3-second delay
}

// Function to generate a response based on user input
function respond(userInput) {
    const cleanedInput = userInput.toLowerCase().trim();
    console.log("User Input:", cleanedInput);

    for (const data of dataset) {
        const inputPatterns = data.input.map((pattern) => pattern.toLowerCase());
        if (inputPatterns.some((pattern) => cleanedInput.includes(pattern))) {
            console.log("Response Found:", data.response);
            return data.response;
        }
    }

    return "(isiZulu)Ngiyaxolisa angiwuzwa umbuzo wakho ukuthi uthini. (English) Sorry, I don't understand your question.";
}

// Function to toggle settings visibility
function toggleSettings() {
    const settingsBox = document.getElementById('settingsBox');
    if (settingsBox) {
        settingsBox.style.display = settingsBox.style.display === 'block' ? 'none' : 'block';
    }
}

// Function to change background color
function bgchange(color) {
    let colorarray = ['#f0ffff', '#000000', 'rgb(143, 143, 143)', '#afeeee', '#f5f5f5'];
    const chatOutput = document.querySelector('#chat-output');
    if (chatOutput) {
        chatOutput.style.backgroundColor = colorarray[color];
    }
}

// Initialize color options
const colorarray = ['#f0ffff', '#000000', 'rgb(143, 143, 143)', '#afeeee', '#f5f5f5'];
const colorbox = document.getElementById('colorbox');

if (colorbox) {
    colorarray.forEach(function (color, index) {
        let span = document.createElement('span');
        span.style.backgroundColor = color;
        span.addEventListener('click', function () {
            bgchange(index);
        });
        colorbox.appendChild(span);
    });
}

// Add event listeners once DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Font size adjustment
    const fontSizeElement = document.getElementById('fontSize');
    if (fontSizeElement) {
        fontSizeElement.addEventListener('input', function () {
            adjustFontSize(this.value);
            userSelectedFontSize = this.value; // Update the global font size value
        });
    }

    // Chat button click event
    const chatButton = document.getElementById('chat-button');
    if (chatButton) {
        chatButton.addEventListener('click', function () {
            sendMessage();
        });
    }

    // Enter key event for chat input
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Cancel button click event for settings
    const cancelSettingsButton = document.getElementById('cancelSettings');
    if (cancelSettingsButton) {
        cancelSettingsButton.addEventListener('click', function () {
            const settingsBox = document.getElementById('settingsBox');
            if (settingsBox) {
                settingsBox.style.display = 'none';
            }
        });
    }
});
