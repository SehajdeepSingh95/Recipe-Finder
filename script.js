const Submit = document.querySelector(".submit");
const input = document.querySelector(".searchBox");
const recipeContainer = document.querySelector(".recipeContainer");

const URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const fetchRecipe = async (query) => {
    const data = await fetch(URL + query);
    const response = await data.json();

    recipeContainer.innerHTML = "";

    if (response.meals) {
        response.meals.forEach(meal => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("cards");

            recipeCard.innerHTML = `
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="card-content">
                    <h5>${meal.strMeal}</h5>
                    <button class="view-btn">View Recipe</button>
                </div>
            `;

            recipeContainer.appendChild(recipeCard);
            
        });
    } else {
        recipeContainer.innerHTML = `<p>No recipes found. Try another search!</p>`;
    }
};

Submit.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = input.value.trim();
    if (searchTerm) {
        fetchRecipe(searchTerm);
        input.value = "";
    }
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        const searchTerm = input.value.trim();
        if (searchTerm) {
            fetchRecipe(searchTerm);
            input.value = "";
        }
    }
});