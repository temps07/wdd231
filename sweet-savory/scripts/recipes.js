import { lazyLoadImages } from './utils.js';

// Recipe data
let recipes = [];

// Only initialize recipe-related elements if we're on the recipes page
const isRecipesPage = window.location.pathname.includes('recipes.html');

// DOM elements - only query if on recipes page
const recipeList = isRecipesPage ? document.getElementById('recipe-list') : null;
const featuredContainer = document.getElementById('featured-container');
const categoryFilter = isRecipesPage ? document.getElementById('category') : null;
const searchInput = isRecipesPage ? document.getElementById('search') : null;
const modal = isRecipesPage ? document.getElementById('recipe-modal') : null;
const modalContent = isRecipesPage ? document.getElementById('modal-content') : null;
const closeModal = isRecipesPage ? document.querySelector('.close-modal') : null;

// Fetch recipes from JSON file
async function fetchRecipes() {
    try {
        const response = await fetch('data/recipes.json');
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}

// Display recipes
function displayRecipes(recipesToDisplay) {
    if (!recipeList) return;

    recipeList.innerHTML = recipesToDisplay.map(recipe => `
        <div class="recipe-card" data-id="${recipe.id}">
            <img src="images/placeholder.jpg" data-src="${recipe.image}" alt="${recipe.name}" loading="lazy">
            <h3>${recipe.name}</h3>
            <p>${recipe.description}</p>
            <button class="view-recipe" data-id="${recipe.id}">View Recipe</button>
        </div>
    `).join('');

    lazyLoadImages();
    setupRecipeClickHandlers();
}

// Display featured recipes on home page
export async function loadFeaturedRecipes() {
    const recipes = await fetchRecipes();
    if (featuredContainer && recipes.length > 0) {
        const featured = recipes.slice(0, 3);
        featuredContainer.innerHTML = featured.map(recipe => `
            <div class="recipe-card" data-id="${recipe.id}">
                <img src="images/placeholder.jpg" data-src="${recipe.image}" alt="${recipe.name}" loading="lazy">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <button class="view-recipe" data-id="${recipe.id}">View Recipe</button>
            </div>
        `).join('');

        lazyLoadImages();
        setupRecipeClickHandlers();
    }
}

// Filter recipes by category
function filterRecipes() {
    if (!categoryFilter || !searchInput) return;

    const category = categoryFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    let filtered = recipes;

    if (category !== 'all') {
        filtered = filtered.filter(recipe => recipe.category === category);
    }

    if (searchTerm) {
        filtered = filtered.filter(recipe => 
            recipe.name.toLowerCase().includes(searchTerm) || 
            recipe.description.toLowerCase().includes(searchTerm)
        );
    }

    displayRecipes(filtered);
}

// Show recipe details in modal
function showRecipeDetails(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    // Get or create modal elements
    let modal = document.getElementById('recipe-modal');
    let modalContent = document.getElementById('modal-content');
    
    // Create modal if it doesn't exist (shouldn't be needed if added to HTML)
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'recipe-modal';
        modal.className = 'modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div id="modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modalContent = document.getElementById('modal-content');
    }

    // Populate modal content
    modalContent.innerHTML = `
        <h2>${recipe.name}</h2>
        <img src="${recipe.image}" alt="${recipe.name}">
        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>Prep Time:</strong> ${recipe.prepTime}</p>
        <p><strong>Cook Time:</strong> ${recipe.cookTime}</p>
        <h3>Ingredients</h3>
        <ul>
            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        <h3>Instructions</h3>
        <ol>
            ${recipe.instructions.map(step => `<li>${step}</li>`).join('')}
        </ol>
    `;

    // Show the modal
    modal.style.display = 'block';

    // Set up event listeners (this is the crucial fix)
    const closeBtn = modal.querySelector('.close-modal');
    
    // Remove any existing listeners to prevent duplicates
    closeBtn.replaceWith(closeBtn.cloneNode(true));
    const newCloseBtn = modal.querySelector('.close-modal');
    
    // Add new listeners
    newCloseBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Separate function to set up modal event listeners
function setupModalEventListeners(modal) {
    // Close button
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
    
    // Close when clicking outside modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
}

// Update your setupRecipeClickHandlers function
function setupRecipeClickHandlers() {
    const recipeButtons = document.querySelectorAll('.view-recipe');
    recipeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const recipeId = parseInt(e.target.dataset.id);
            showRecipeDetails(recipeId);
        });
    });
}

// Initialize recipe page
async function initRecipePage() {
    if (!isRecipesPage) return;

    await fetchRecipes();
    displayRecipes(recipes);

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterRecipes);
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterRecipes);
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal && modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize based on current page
if (isRecipesPage) {
    initRecipePage();
}