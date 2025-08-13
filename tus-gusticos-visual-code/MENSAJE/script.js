document.addEventListener('DOMContentLoaded', function() {
    // Select key elements
    const enterButton = document.querySelector('.btn-entrar');

    // Enter button click handler
    enterButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear any stored registration or password reset data
        localStorage.removeItem('userFirstName');
        localStorage.removeItem('userLastName');
        localStorage.removeItem('userGender');
        localStorage.removeItem('userEmail');
        
        // Redirect to login page
        // Replace with your actual login page URL
        window.location.href = 'login.html';
    });

    // Optional: Add some subtle animation to the success icon
    const successIcon = document.querySelector('.success-icon i');
    successIcon.style.animation = 'bounce 1s ease-in-out';

    // Prevent going back to previous pages in the reset flow
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function() {
        window.history.pushState(null, null, window.location.href);
    };
});

// Optional CSS animation for the success icon
// You can add this to your existing CSS file
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerHTML = `
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {transform: scale(1);}
    40% {transform: scale(1.2);}
    60% {transform: scale(1.1);}
}
`;
document.head.appendChild(styleSheet);