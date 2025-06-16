// Main JavaScript module
import { toggleMenu } from './menu.js';
import { displayCurrentYear } from './utils.js';

// Initialize functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    toggleMenu();
    displayCurrentYear();
    
    // Load featured recipes on home page
    if (document.querySelector('#featured-container')) {
        import('./recipes.js').then(module => {
            module.loadFeaturedRecipes();
        });
    }
});