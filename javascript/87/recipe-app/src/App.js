import chocolateCakeImage from './images/chocolateCake.jpg';
import './App.css';
import React, { Component, useState } from 'react';
import Recipe from './Recipe';
import RecipeDetails from './RecipeDetails';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './Header';


export default class App extends Component {
  render() {
    return (
      <div className="container text-center" >
        <Header />
        <Switch>
          <Route path="/recipes">
            <Recipe />
          </Route>
          <Route path="/recipe/:recipeId">
            <RecipeDetails />
          </Route>
          <Redirect to="/recipes" />
        </Switch>
      </div>
    );
  }
}