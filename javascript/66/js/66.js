(function () {
    'use strict';

    /*global $ */

    const recipe = $('#recipes');
    const submitButton = $('#submit');
    const ingredientsList = $('#ingredients');
    const recipeName = $('#recipeName');
    const recipeImg = $('#recipeImg');

    submitButton.click(e => {
        e.preventDefault();
        let recipeChoice = recipe.val();
        ingredientsList.empty();
        fetch('66.json')
            .then(r => r.json())
            .then((r) => {
                r.forEach(element => {
                    if (element.name === recipeChoice) {
                        displayRecipe(element);
                    }
                });
            })
            .catch(error => ingredientsList.text(error));
    });

    function displayRecipe(recipe) {
        let name = recipe.name;
        let img = recipe.img;
        let ingredientsArray = recipe.ingredients;
        recipeName.text(name);
        recipeImg.attr("src", img);
        for (let i = 0; i < ingredientsArray.length; i++) {
            addIngredient(ingredientsArray[i]);
        }
        ingredientsList.text();
    }

    function addIngredient(ingredient) {
        ingredientsList.append(`<li>${ingredient}</li>`);
    }


}());