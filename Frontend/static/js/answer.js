document.addEventListener('DOMContentLoaded', function() {
    // Get buttons
    const chatbotButton = document.getElementById('chatbot-button');
    const homeButton = document.getElementById('home-button');
    
    // Add event listeners
    chatbotButton.addEventListener('click', function() {
        window.location.href = '/chatbot';
    });
    
    homeButton.addEventListener('click', function() {
        window.location.href = '/';
    });
});