import React, { useState, useEffect } from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom';
import StockInfo from './StockInfo';

export default function CompanyList() {

    const apiKey = `OjBiMGJiMjYzZjJhYWFmZjE1MmYyNWIwMjZmM2VmYTE1`;
    const [companiesList, setCompaniesList] = useState([]);
    const [tickerVal, setTickerVal] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://api-v2.intrinio.com/companies?has_stock_prices=true&api_key=${apiKey}`);
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                const companies = await response.json();
                setCompaniesList(companies);
                console.log(companies);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const setInputVal = (val) => {
        console.log(val)
    }

    function getCompaniesList(List) {
        if (List.companies) {
            return <ul className="companyList">
                {List.companies.map(company => <li key={company.id} onClick={() => setInputVal(company.ticker)}><h3>{company.ticker}</h3> <p>{company.name}</p></li>)}
            </ul>
        }
        return null;
    }

    function getCompanyChoices(List) {
        if (List.companies) {
            return <datalist id="companyChoices" className="companyList">
                {List.companies.map(company => <option key={company.id} value={company.ticker} />)}
            </datalist>
        }
        return null;
    }

    return (
        <div>
            <main>
                <div className="stockSelector">
                    <label>Enter Stock Ticker</label>
                    <input id="tickerId" list="companyChoices" onChange={event => setTickerVal(event.target.value)}></input>
                    {getCompanyChoices(companiesList)}
                    <Link to={`/CompanyList/Companies/${tickerVal}`}>
                        <button>Update</button>
                    </Link>
                    <Switch>
                        <Route path="/CompanyList/Companies/:companyId">
                            <StockInfo />
                        </Route>
                        <Redirect to="/CompanyList" />
                    </Switch>
                </div>
                <div className="sidebar">
                    {getCompaniesList(companiesList)}
                </div>
            </main>
        </div>
    )
}

