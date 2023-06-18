const socket = io();

const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default form submission behavior
    sendMessage();
  }
});

socket.on('message', message => {
  displayMessage(message.message, message.messageType);
});

function sendMessage() {
  const message = messageInput.value.trim();
  if (message === '') {
    return;
  }

  displayMessage(message, 'user-message');

  // Generate a random number string for the user ID
  const uid = Math.random().toString(36).substring(7);

  // Send message to the server
  socket.emit('message', { message, uid });

  // Clear the input field
  messageInput.value = '';
  messageInput.focus(); // Focus the input field after sending the message
}

function displayMessage(message, messageType) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(messageType);

  // Create a message text element
  const messageText = document.createElement('p');
  messageText.classList.add('message-text');
  messageText.textContent = message;

  if (messageType === 'bot-message') {
    // Create an image element for the chatbot's image
    const chatbotImage = document.createElement('img');
    chatbotImage.src = 'https://avatars.githubusercontent.com/u/101915713';
    chatbotImage.alt = 'Chatbot';
    chatbotImage.classList.add('chatbot-image'); // Add a class for styling

    // Create a div container for the chatbot message and image
    const chatbotMessageContainer = document.createElement('div');
    chatbotMessageContainer.classList.add('chatbot-message-container');

    // Append the chatbot image to the container
    chatbotMessageContainer.appendChild(chatbotImage);

    // Append the message text to the container
    chatbotMessageContainer.appendChild(messageText);

    // Append the container to the message element
    messageElement.appendChild(chatbotMessageContainer);
  } else {
    // Append the message text directly to the message element
    messageElement.appendChild(messageText);
  }

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Automatically focus the input field on page load
window.addEventListener('DOMContentLoaded', () => {
  messageInput.focus();
});
