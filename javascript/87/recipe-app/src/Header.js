import React from 'react'
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <h1>Recipe List</h1>
      <div id="navBar">
        <NavLink to='/recipes'>Recipe List</NavLink> | <NavLink to='Home'>foo</NavLink>
      </div>
    </header>
  )
}
