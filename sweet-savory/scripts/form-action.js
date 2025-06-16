// Display submitted form data
document.addEventListener('DOMContentLoaded', () => {
    const formDataContainer = document.getElementById('form-data');
    const params = new URLSearchParams(window.location.search);
    
    if (formDataContainer && params) {
        formDataContainer.innerHTML = `
            <div class="form-data-item">
                <strong>Name:</strong> ${params.get('name') || 'Not provided'}
            </div>
            <div class="form-data-item">
                <strong>Email:</strong> ${params.get('email') || 'Not provided'}
            </div>
            <div class="form-data-item">
                <strong>Subject:</strong> ${params.get('subject') || 'Not provided'}
            </div>
            <div class="form-data-item">
                <strong>Message:</strong> ${params.get('message') || 'Not provided'}
            </div>
        `;
    }
    
    // Store form data in localStorage
    const formData = {
        name: params.get('name'),
        email: params.get('email'),
        subject: params.get('subject'),
        message: params.get('message'),
        timestamp: new Date().toISOString()
    };
    
    const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    submissions.push(formData);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
});