import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import Blogs from './Blogs';
import Blog from './Blog';

function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Blog Site</h1>
        <div id="HomeButtonDiv">
          <Link to="/blogs">
            <button id="homeLink">Home</button>
          </Link>
        </div>
      </header>
      <Switch>
        <Route path="/blogs">
          <Blogs />
        </Route>
        <Route path="/blog/:blogId">
          <Blog />
        </Route>
        <Redirect to="/blogs" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
