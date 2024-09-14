
document.getElementById('chat-button').addEventListener('click', function () {
    const userInput = document.getElementById('chat-input').value.trim();
    document.getElementById('chat-input').value = '';

    if (userInput !== '') {
        addChatMessage('You', userInput, 'user-message');
        handleChat(userInput);
    }
});


document.getElementById('chat-input').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


function sendMessage() {
    const userInput = document.getElementById('chat-input').value.trim();
    if (userInput !== '') {
        document.getElementById('chat-input').value = '';
        addChatMessage('You', userInput, 'user-message');
        handleChat(userInput);
    }
}


function addChatMessage(sender, message, messageType) {
    const chatOutput = document.getElementById('chat-output');
    const messageElement = document.createElement('p');
    messageElement.className = `message ${messageType}`;
    messageElement.textContent = `${sender}: ${message}`;

    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight; // Auto-scroll to the bottom
}

function showTypingIndicator() {
    const chatOutput = document.getElementById('chat-output');
    const typingElement = document.createElement('p');
    typingElement.className = 'typing-indicator';
    typingElement.textContent = 'Typing...';

    chatOutput.appendChild(typingElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;

    return typingElement; // Return the element to remove it later
}


function handleChat(userInput) {
    const response = respond(userInput);

    // Show typing indicator
    const typingElement = showTypingIndicator();

    // Simulate delay before bot responds
    setTimeout(() => {
        typingElement.remove(); // Remove typing indicator
        addChatMessage('Bot', response, 'bot-message');
    }, 3000); // 3-second delay
}

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

// Font size adjustment
function adjustFontSize(size) {
    const chatOutput = document.getElementById('chat-output');
    chatOutput.style.fontSize = size + 'px';

    const userMessages = chatOutput.getElementsByClassName('user-message');
    const botMessages = chatOutput.getElementsByClassName('bot-message');

    for (let i = 0; i < userMessages.length; i++) {
        userMessages[i].style.fontSize = size + 'px';
    }

    for (let i = 0; i < botMessages.length; i++) {
        botMessages[i].style.fontSize = size + 'px';
    }
}

// Toggle settings visibility
function toggleSettings() {
    const settingsBox = document.getElementById('settingsBox');
    settingsBox.style.display = settingsBox.style.display === 'block' ? 'none' : 'block';
}

// Color change function
function bgchange(color) {
    let colorarray = ['#f0ffff', '#000000', 'rgb(143, 143, 143)', '#afeeee', '#f5f5f5'];
    document.querySelector('#chat-output').style.backgroundColor = colorarray[color];
}

var colorarray = ['#f0ffff', '#000000', 'rgb(143, 143, 143)', '#afeeee', '#f5f5f5'];
var colorbox = document.getElementById('colorbox');

colorarray.forEach(function (color, index) {
    let span = document.createElement('span');
    span.style.backgroundColor = color;
    span.addEventListener('click', function () {
        bgchange(index);
    });
    colorbox.appendChild(span);
});

// Add event listener for the range input to adjust font size dynamically
document.getElementById('fontSize').addEventListener('input', function () {
    adjustFontSize(this.value);
});
