document.getElementById('chat-button').addEventListener('click', function() {
    const userInput = document.getElementById('chat-input').value;
    document.getElementById('chat-input').value = '';

    addChatMessage('You', userInput, 'user-message');
    handleChat(userInput);
});

document.getElementById('chat-button').addEventListener('click', function() {
    sendMessage();
});

document.getElementById('chat-input').addEventListener('keypress', function(event) {
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

    messageElement.textContent = message;

    chatOutput.appendChild(messageElement);
    chatOutput.scrollTop = chatOutput.scrollHeight;
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

function handleChat(input) {
    const entities = extractEntities(input);
    const response = generateResponse(entities);

      // Show typing indicator
      const typingElement = showTypingIndicator();

     // Add bot response after a 3-second delay
     setTimeout(() => {
        typingElement.remove(); // Remove typing indicator
        addChatMessage('Bot', response, 'bot-message');
    }, 3000); // 3000 milliseconds = 3 seconds
}



function extractEntities(input) {
    const entities = {};

    // Example entity extraction
    if (input.includes('weather')) {
        entities.intent = 'weather';
    } else if (input.includes('time')) {
        entities.intent = 'time';
    }
    else if (input.includes('Hey')) {
        entities.intent = 'Hey';
    } else {
        entities.intent = 'unknown';
    }

    return entities;
}

function generateResponse(entities) {
    switch (entities.intent) {
        case 'weather':
            return 'Sure, I can help with the weather. Where are you located?';
        case 'time':
            return `The current time is ${new Date().toLocaleTimeString()}.`;
        case 'Hey':
            return'Hi, How can I help';
        default:
            return 'I am not sure how to respond to that.';
    
    }
}


 // Toggle settings visibility
 function toggleSettings() {
    const settingsBox = document.getElementById('settingsBox');
    settingsBox.style.display =
      settingsBox.style.display === 'block' ? 'none' : 'block';
  }


  // Color functions
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
  
 // Add event listener for the range input to adjust font size dynamically
 document.getElementById('fontSizeSelector').addEventListener('input', function() {
    adjustFontSize(this.value);
});
