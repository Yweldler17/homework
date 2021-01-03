import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


export default () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/data/recipes.json');
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                const recipes = await response.json();
                setRecipes(recipes);
                console.log(recipes);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <ul className="bulletlessList">
            {recipes.map(r => (
                <li key={r.id}>
                    <Link to={`/recipe/${r.id}`}>{r.name}</Link>
                </li>))}
        </ul >
    )
}