const menuButton = document.getElementById('menu');
const navigation = document.querySelector('#animate');

// Add event listener to menu button
menuButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  menuButton.classList.toggle('open');
  });

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// DOM Elements
const certificateSection = document.querySelector('#certificate-section');
const filterButtons = document.querySelectorAll('.filter-btn');
const totalCreditsElement = document.querySelector('#total-credits');

// Initialize the page
function init() {
    // displayCourseDetails(course);
    displayCourses(courses);
    updateTotalCredits(courses);
    setupEventListeners();
}

// Display courses based on filter
function displayCourses(coursesToDisplay) {
    certificateSection.innerHTML = '';
    
    // if (coursesToDisplay.length === 0) {
    //     certificateSection.innerHTML = '<p class="no-courses">No courses match your criteria</p>';
    //     return;
    // }
    
    coursesToDisplay.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : 'incomplete'} ${course.subject}`;
        
        courseCard.innerHTML = `
            <div class="course-header">
                <h3>${course.subject} ${course.number}</h3>
                <span class="status-badge ${course.completed ? 'completed' : 'incomplete'}">
                    ${course.completed ? '✓ Completed' : 'In Progress'}
                </span>
            </div>
            <h4>${course.title}</h4>
            <p class="credits">${course.credits} credit${course.credits !== 1 ? 's' : ''}</p>
            <p class="description">${course.description}</p>
            <div class="technologies">
                <strong>Technologies:</strong>
                ${course.technology.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <p class="certificate">Certificate: ${course.certificate}</p>
        `;
        
        certificateSection.appendChild(courseCard);
    });
}

// Update total credits display
function updateTotalCredits(coursesToCalculate) {
    const totalCredits = coursesToCalculate.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsElement.textContent = `Total Credits Required: ${totalCredits}`;
}

// Filter courses based on department
function filterCourses(department) {
    if (department === 'all') {
        return courses;
    }
    return courses.filter(course => course.subject === department);
}

// // Search courses based on input
// function searchCourses(searchTerm) {
//     const term = searchTerm.toLowerCase();
//     return courses.filter(course => 
//         course.title.toLowerCase().includes(term) ||
//         course.description.toLowerCase().includes(term) ||
//         course.technology.some(tech => tech.toLowerCase().includes(term)) ||
//         `${course.subject}${course.number}`.toLowerCase().includes(term)
//     );
// }

// Set up event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const department = button.dataset.department;
            const filteredCourses = filterCourses(department);
            displayCourses(filteredCourses);
            updateTotalCredits(filteredCourses);
            
            // Update active button styling
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
    
    // Search input
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        if (searchTerm.length > 0) {
            const searchedCourses = searchCourses(searchTerm);
            displayCourses(searchedCourses);
            updateTotalCredits(searchedCourses);
        } else {
            // If search is empty, show whatever filter is active
            const activeFilter = document.querySelector('.filter-btn.active');
            const department = activeFilter ? activeFilter.dataset.department : 'all';
            const filteredCourses = filterCourses(department);
            displayCourses(filteredCourses);
            updateTotalCredits(filteredCourses);
        }
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = `©${currentYear}`;
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `LastModified: ${lastModified}`;

function displayCourseDetails(course) {
  courseDetails.innerHTML = '';
  courseDetails.innerHTML = `
    <button id="closeModal">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
  `;
  courseDetails.showModal();
  
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}
