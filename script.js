const Submit = document.querySelector(".submit");
const input = document.querySelector(".searchBox");
const recipeContainer = document.querySelector(".recipeContainer");
const recipeDetails = document.getElementById("recipeDetails");
const closeBtn = document.querySelector(".close");
const recipeName = document.getElementById("recipeName");
const recipeImage = document.getElementById("recipeImage");
const recipeDescription = document.getElementById("recipeDescription");
const recipeIngredients = document.getElementById("recipeIngredients");

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
                </div>
            `;
            const button = document.createElement("button");
            button.classList.add("view-btn");
            button.textContent = "View Recipe";
            recipeCard.querySelector(".card-content").appendChild(button);

            button.addEventListener("click", () => {
                recipeName.textContent = meal.strMeal;
                recipeImage.src = meal.strMealThumb;
                recipeDescription.textContent = meal.strInstructions;
                recipeDetails.classList.remove("hidden");
                const ingredients = [];
                let i = 1;

                while (meal[`strIngredient${i}`]) {
                    const ingredient = meal[`strIngredient${i}`];
                    const measure = meal[`strMeasure${i}`];

                    if (ingredient.trim() !== "") {
                        ingredients.push({ name: ingredient, measure: measure || "" });
                    }
                    i++;
                }

                ingredients.forEach(item => {
                    const li = document.createElement("li");
                    li.textContent = `${item.measure} ${item.name}`;
                    recipeIngredients.appendChild(li);
                });

            });

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


closeBtn.addEventListener("click", () => {
    recipeDetails.classList.add("hidden");
});
