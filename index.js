class Recipe {
    constructor(name, ingredients, cookingDescription, cookingTime) {
        this.name = name;
        this.ingredients = ingredients;
        this.cookingDescription = cookingDescription;
        this.cookingTime = cookingTime;
    }

    isValid() {
        return !!this.name && Array.isArray(this.ingredients) && !!this.cookingDescription && !isNaN(this.cookingTime);
    }
}

class RecipeBook {
    constructor() {
        this.recipes = [];
    }

    addRecipe(recipe) {
        if (recipe.isValid()) {
            this.recipes.push(recipe);
        }
    }

    findRecipesByTime(maxCookingTime) {
        return this.recipes.filter(recipe => recipe.cookingTime <= maxCookingTime);
    }

    findRecipesByIngredients(searchIngredients) {
        return this.recipes.filter(recipe => searchIngredients.every(ingredient => recipe.ingredients.includes(ingredient)));
    }
}

const recipeBook = new RecipeBook();

recipeBook.addRecipe(new Recipe("Pasta with Sauce", ["pasta", "tomatoes", "oil"], "Cook pasta and sauce", 30));
recipeBook.addRecipe(new Recipe("Veal Stir-Fry", ["veal", "soy sauce", "ginger"], "Stir-fry veal with sauce", 60));
recipeBook.addRecipe(new Recipe("Roasted Potatoes", ["potatoes", "oil", "herbs"], "Roast potatoes", 120));
recipeBook.addRecipe(new Recipe("Salad", ["lettuce leaves", "tomatoes"], "", 15));
recipeBook.addRecipe(new Recipe("Chicken Curry", ["chicken", "onions", "curry paste"], "Cook chicken with onions and curry paste", 45));
recipeBook.addRecipe(new Recipe("Vegetable Stir-Fry", ["broccoli", "carrots", "soy sauce"], "Stir-fry vegetables with soy sauce", 25));
recipeBook.addRecipe(new Recipe("Chocolate Cake", ["flour", "sugar", "cocoa powder"], "Bake a delicious chocolate cake", 60));
recipeBook.addRecipe(new Recipe("Grilled Salmon", ["salmon fillet", "lemon", "olive oil"], "Grill salmon with lemon and olive oil", 30));
recipeBook.addRecipe(new Recipe("Mashed Potatoes", ["potatoes", "butter", "milk"], "Boil and mash potatoes, then mix with butter and milk", 40));


function searchByTime() {
    const maxCookingTime = prompt("Enter maximum cooking time (in minutes):");
    if (!maxCookingTime || isNaN(maxCookingTime)) return;

    const result = recipeBook.findRecipesByTime(parseInt(maxCookingTime, 10));
    displayResults(result);
}

function searchByIngredients() {
    const ingredientsInput = prompt("Enter ingredients separated by commas:");
    if (!ingredientsInput) return;

    const searchIngredients = ingredientsInput.split(',').map(ingredient => ingredient.trim());
    const result = recipeBook.findRecipesByIngredients(searchIngredients);
    displayResults(result);
}

function displayResults(results) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    if (results.length === 0) {
        outputDiv.innerHTML = '<p>No recipes found.</p>';
        return;
    }

    const ul = document.createElement('ul');
    results.forEach(recipe => {
        const li = document.createElement('li');
        li.textContent = recipe.name;
        ul.appendChild(li);
    });

    outputDiv.appendChild(ul);
}
