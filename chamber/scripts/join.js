 // Set timestamp when page loads
document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    document.getElementById('timestamp').value = now.toISOString();
});
        
        // Modal functions
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}        
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}        
        // Close modal when clicking outside of content
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}        
        // Handle form validation for organizational title pattern
document.getElementById('orgTitle').addEventListener('input', function(e) {
    const pattern = /^[A-Za-z\- ]{7,}$/;
    if (this.value && !pattern.test(this.value)) {
        this.setCustomValidity('Please use only letters, hyphens, and spaces (minimum 7 characters)');
    } else {
        this.setCustomValidity('');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu');
    const nav = document.querySelector('nav'); // Changed from #animate to nav
    
    // Toggle menu open/close
    menuButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
        menuButton.classList.toggle('open');
        nav.classList.toggle('open');
    });
    
    // Close menu when a nav link is clicked (for mobile)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Only close if menu is open (mobile view)
            if (menuButton.classList.contains('open')) {
                menuButton.classList.remove('open');
                nav.classList.remove('open');
            }
            
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Close menu when clicking outside (for mobile)
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
            menuButton.classList.remove('open');
            nav.classList.remove('open');
        }
    });
});