const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');

// Function to display messages
function displayMessage(message, type) {
  const messageElem = document.createElement('div');
  messageElem.classList.add('message', type);
  messageElem.innerText = message;
  chatBox.appendChild(messageElem);
  chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll to bottom
}

// Event listener for send button click
sendBtn.addEventListener('click', async () => {
  const userMessage = messageInput.value.trim();
  
  if (userMessage) {
    displayMessage(userMessage, 'user');  // Show user message
    messageInput.value = '';    

    // Fetch response from backend
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();
    displayMessage(data.response, 'bot');  // Show bot response
  }
});

// Pressing Enter triggers sending message
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});