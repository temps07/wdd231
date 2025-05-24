const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = `©${currentYear}`;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `LastModified: ${lastModified}`;

    // DOM elements
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');
const membersContainer = document.getElementById('membersContainer');    
    // Current view state
let currentView = 'grid';
    
    // Event listeners for view toggle
gridBtn.addEventListener('click', () => {
    currentView = 'grid';
    displayMembers(membersData);
}); 

listBtn.addEventListener('click', () => {
    currentView = 'list';
    displayMembers(membersData);
});
    
    // Store member data
let membersData = [];
    
    // Fetch member data
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        membersData = await response.json();
        displayMembers(membersData);
    } catch (error) {
        console.error('Error fetching member data:', error);
        membersContainer.innerHTML = '<p>Error loading member data. Please try again later.</p>';
    }
}
    
    // Display members based on current view
function displayMembers(members) {
    if (currentView === 'grid') {
        displayGrid(members);
    } else {
        displayList(members);
    }
}
    
    // Display members in grid view
function displayGrid(members) {
    let html = '<div class="grid-view">';
        
    members.forEach(member => {
        const levelClass = getMembershipLevelClass(member.membershipLevel || member.membershipLevel);
            
        html += `
            <div class="member-card ${levelClass}">
                <img src="images/${member.image}" alt="${member.name} logo">
                <h2>${member.name}</h2>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Website:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
                <p><strong>Industry:</strong> ${member.industry}</p>
                <p><strong>Member Since:</strong> ${member.joined}</p>
            </div>
        `;
    });
        
    html += '</div>';
    membersContainer.innerHTML = html;
}
    
    // Display members in list view
function displayList(members) {
    let html = '<div class="list-view">';
        
    members.forEach(member => {
        const levelClass = getMembershipLevelClass(member.membershipLevel || member.membershipLevel);
            
        html += `
            <div class="list-item ${levelClass}">
                <img src="images/${member.image}" alt="${member.name} logo">
                <div class="info">
                    <h2>${member.name}</h2>
                    <p>${member.address} | ${member.phone}</p>
                </div>
                <div>
                    <a href="${member.url}" target="_blank">Website</a>
                </div>
            </div>
        `;
    });
        
    html += '</div>';
    membersContainer.innerHTML = html;
}
    
    // Get membership level class for styling
function getMembershipLevelClass(level) {
    switch(level) {
        case 1: return '';
        case 2: return 'silver';
        case 3: return 'gold';
        default: return '';
    }
}
    
    // Initialize the page
fetchMembers();
const menuButton = document.getElementById('menu');
const navigation = document.querySelector('#animate');

// Add event listener to menu button
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menu');
    const nav = document.getElementById('animate');
    
    // Toggle menu open/close
    menuButton.addEventListener('click', function() {
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
    
    // Optional: Close menu when clicking outside (for mobile)
    document.addEventListener('click', function(event) {
        const isClickInside = menuButton.contains(event.target) || nav.contains(event.target);
        if (!isClickInside && menuButton.classList.contains('open')) {
            menuButton.classList.remove('open');
            nav.classList.remove('open');
        }
    });
});