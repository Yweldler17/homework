
import './App.css';
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom';
import CompanyList from './CompanyList';


function App() {
  return (
    <BrowserRouter>
      <header>
        <h1>Stock Market Site</h1>
        <div id="HomeButtonDiv">
          <Link to="/CompanyList">
            <button id="homeLink">Home</button>
          </Link>
        </div>
      </header>
      <Switch>
        <Route path="/CompanyList">
          <CompanyList />
        </Route>
        {/* <Route path="/StockInfo">
          <StockInfo />
        </Route> */}
        <Redirect to="/CompanyList" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
