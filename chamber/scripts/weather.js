const myTown = document.querySelector('#town');
const myDes = document.getElementById("description")
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.getElementById('graphic');
const myKey =  "0c47f8e67b2853dc00d24965a6dfad99"
const myLat = "6.457570090092063"
const myLong = "3.6168246227516394"
const myURL = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`
async function apiFetch() {
  try {
    const response = await fetch(myURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayResult(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}
apiFetch();
function displayResult(data) {
    console.log('hello')
    myTown.innerHTML = data.name
    myDes.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&degC`
    const iconSource = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute('SRC', iconSource)
    myGraphic.setAttribute('alt', data.weather[0].description)
}
        const gridBtn = document.getElementById('gridBtn');
        const listBtn = document.getElementById('listBtn');
        const membersContainer = document.getElementById('membersContainer');    
        const spotlightsContainer = document.getElementById('spotlightsContainer');
            
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
        function displaySpotlights(members) {
            let html = '<div class="spotlights-container"><h2>Member Spotlights</h2><div class="spotlights-grid">';
            
            spotlights.forEach(member => {
                const levelClass = getMembershipLevelClass(member.membershipLevel);
                
                html += `
                    <div class="spotlight-card ${levelClass}">
                        <img src="images/${member.image}" alt="${member.name} logo" style="max-width:100px;max-height:100px;">
                        <h3>${member.name}</h3>
                        <p class="highlight">${member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member'}</p>
                        <p><strong>Industry:</strong> ${member.industry}</p>
                        <p>${member.shortDescription || 'Featured member'}</p>
                        <a href="${member.url}" target="_blank" class="visit-btn">Visit Website</a>
                    </div>
                `;
            });
            
            html += '</div></div>';
            if (spotlightsContainer) {
                spotlightsContainer.innerHTML = html;
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
                const levelClass = getMembershipLevelClass(member.membershipLevel);
                    
                html += `
                    <div class="member-card ${levelClass}">
                        <img src="images/${member.image}" alt="${member.name} logo" style="max-width:200px;max-height:150px;">
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
                const levelClass = getMembershipLevelClass(member.membershipLevel);
                    
                html += `
                    <div class="list-item ${levelClass}">
                        <img src="images/${member.image}" alt="${member.name} logo" style="width:60px;height:60px;">
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
        
        function getMembershipLevelClass(level) {
            switch(level) {
                case 1: return '';
                case 2: return 'silver';
                case 3: return 'gold';
                default: return '';
            }
        }
        
        fetchMembers();
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = `©${currentYear}`;
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `LastModified: ${lastModified}`;
let today = new Date();
let nextTomorrow = new Date(today);
nextTomorrow.setDate(today.getDate() + 2);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let nextTomorrowDay = days[nextTomorrow.getDay()];
document.getElementById("nextTomorrow").innerHTML = nextTomorrowDay

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