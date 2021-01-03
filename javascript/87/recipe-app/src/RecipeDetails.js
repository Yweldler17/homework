import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


export default () => {
    //const [recipeId, setRecipeId] = useState([]);
    const [recipeName, setRecipeName] = useState([]);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeDirections, setRecipeDirections] = useState([]);
    const [recipeImg, setRecipeImg] = useState([]);

    let { recipeId } = useParams();

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/data/${recipeId}.json`);
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                const recipe = await response.json();
                //setRecipeId(recipe.id);
                setRecipeName(recipe.name);
                setRecipeIngredients(recipe.ingredients);
                setRecipeDirections(recipe.directions);
                setRecipeImg(recipe.img);
                console.log(recipe);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <>
            <div className="ingredientsDiv">
                <h2 className="currentRecipe">{recipeName}</h2>
                <img src={recipeImg} alt={recipeName}></img>
                <h3>{recipeIngredients.map((ingredient) =>
                    <p>{ingredient}</p>
                )}</h3>
                <p>{recipeDirections}</p>
            </div>
        </>
    );
}