// Function to handle sending messages
function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput === '') return; // Do nothing if the input is empty

    const chatBox = document.getElementById('chat-box');

    // Display user message
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${userInput}`;
    userMessage.classList.add('user-message');
    chatBox.appendChild(userMessage);

    // Send message to server and get response
    fetch('/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        // Display chatbot response
        const botMessage = document.createElement('div');
        botMessage.textContent = `Bot: ${data.response}`;
        botMessage.classList.add('bot-message');
        chatBox.appendChild(botMessage);

        // Scroll to the bottom of the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Clear the input field
    document.getElementById('user-input').value = '';
}

// Event listener for the Enter key to send the message
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
        event.preventDefault(); // Prevent form submission
    }
});

