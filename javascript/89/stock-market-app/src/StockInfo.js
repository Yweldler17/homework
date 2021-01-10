import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import sleep from './sleep';


export default function StockInfo() {

    let { companyId } = useParams();

    const apiKey = `OjBiMGJiMjYzZjJhYWFmZjE1MmYyNWIwMjZmM2VmYTE1`;
    const [companyInfo, setCompanyInfo] = useState([]);
    const [priceInfo, setPriceInfo] = useState([]);
    const [firstTime, setFirstTime] = useState(true);

    useEffect(() => {

        (async () => {
            try {
                const response = await fetch(`https://api-v2.intrinio.com/companies/${companyId.toUpperCase()}?api_key=${apiKey}`);
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                const companyInfo = await response.json();
                setCompanyInfo(companyInfo);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [companyId]);

    useEffect(() => {

        (async () => {
            try {
                const response = await fetch(`https://api-v2.intrinio.com/securities/${companyId.toUpperCase()}/prices/realtime?api_key=${apiKey}`);

                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                if (firstTime) {
                    setFirstTime(false);
                } else {
                    await sleep(5000);
                }
                const currentpriceInfo = await response.json();
                setPriceInfo(currentpriceInfo);
            } catch (err) {
                console.error(err);
            }

        })();
    });


    const getPriceInfo = (info) => {
        let returnVal = null;
        if (info) {
            if (info.last_price > info.open_price) {
                returnVal = <h2 className="higherPrice">${info.last_price}{"\u2191"}</h2>
            } else {
                returnVal = <h2 className="lowerPrice">${info.last_price}{"\u2193"}</h2>
            }
        }
        return returnVal;
    }

    return (
        <div className="companyInfo">
            <div>
                <div className="stockHeader">
                    <div>
                        <h1>{companyInfo.ticker} - {companyInfo.name || null}</h1>
                        <h2>{companyInfo.industry_category || null}</h2>
                    </div>
                    <div className="stockPrice">
                        {getPriceInfo(priceInfo)}
                    </div>
                </div>
                <hr />
                <p>{companyInfo.short_description || null}</p>
            </div>
        </div>
    )
}