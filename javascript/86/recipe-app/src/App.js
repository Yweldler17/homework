import chocolateCakeImage from './images/chocolateCake.jpg';
import './App.css';
import React, { useState } from 'react';
import Recipe from './Recipe';
import RecipeDetails from './RecipeDetails';

export default function App() {

  const recipes = [
    {
      id: 1,
      name: "Chocolate Cake",
      img: chocolateCakeImage,
      ingredients: [
        "Flour",
        "Sugar",
        "Cocoa Powder",
        "Baking Soda",
        "Baking Powder",
        "Salt",
        "Eggs",
        "Warm Water",
        "Vegetable Oil",
        "Vanilla Extract"
      ],
      directions: "Preheat the oven to 350 degrees F. Mix all the ingredients together into one huge jumble. Shake well. Bake until it tastes good. Eat it."
    },
    {
      id: 2,
      name: "Chicken Soup",
      img: "images/chickenSoup.jpg",
      ingredients: [
        "Chicken",
        "Squash",
        "Carrot",
        "Parsnip",
        "Chicken Bones",
        "Salt",
        "Potato"
      ]
    },
    {
      id: 3,
      name: "Scrambled Eggs",
      img: "images/scrambledEggs.jpg",
      ingredients: [
        "Eggs",
        "Butter",
        "Milk",
        "Mozzarella Cheese",
        "Salt",
        "Fried Onions"
      ]
    },
    {
      id: 4,
      name: "Hot Dogs",
      img: "images/hotDog.jpg",
      ingredients: [
        "Hot Dogs",
        "Hot Dog Buns",
        "Ketchup",
        "Baked Beans",
        "Fried Onions"
      ]
    }
  ]

  const [recipeList, setRecipeList] = useState(recipes);


  return (
    <div className="App" >
      <header>
        <h1>Recipe List</h1>
      </header>
      { recipeList.map(recipe => <Recipe recipe={recipe} key={recipe.id} />)}
      <div className="ingrendientsDiv">
        <h2 className="currentRecipe">{recipeList[0].name}</h2>
        <img src={recipeList[0].img} alt={recipeList[0].name}></img>

        {recipeList[0].ingredients.map((ingredient, index) => <RecipeDetails recipeDetails={ingredient} key={index} />)}

        <p className="directionsText">{recipeList[0].directions}</p>
      </div>
    </div>
  );
}

