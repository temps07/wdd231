// Fetch attractions data
async function fetchAttractions() {
    try {
        const response = await fetch('data/discover.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching attractions:', error);
        return [];
    }
}

// Generate gallery cards
async function generateGallery() {
    const gallery = document.querySelector('.gallery');
    const attractions = await fetchAttractions();
    
    gallery.innerHTML = '';
    
    attractions.forEach((attraction, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${attraction.image}" alt="${attraction.name}" class="card-img" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${attraction.name}</h3>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <a href="#" class="btn">Learn More</a>
            </div>
        `;
        
        gallery.appendChild(card);
    });
}

// Track visits and display message
function trackVisits() {
    const visitMessage = document.getElementById('visitMessage');
    const now = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    
    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const diffInMs = now - lastVisitDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        
        if (diffInDays < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = diffInDays === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${diffInDays} ${dayText} ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', now.toString());
}

// Set footer information
function setFooterInfo() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
}

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
    generateGallery();
    trackVisits();
    setFooterInfo();
});