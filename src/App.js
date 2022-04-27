import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Table from "./components/Table/Table";

function App() {
    const [marketData, setMarketData] = useState({
        marketCap: 0,
        marketCapChange: 0,
        tradingVolume: 0,
        activeCoins: 0,
    });

    useEffect(() => {
        // sending two requests to get global data and total volume
        axios
            .all([
                axios.get("https://api.coingecko.com/api/v3/global", {
                    "Access-Control-Allow-Origin": "*",
                }),
                axios.get(
                    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=0"
                ),
            ])
            .then(
                axios.spread(({ data }, data2) => {
                    // i'm summing up every volume of coins
                    let volume = 0;
                    for (let key in data.data.total_volume) {
                        volume += data.data.total_volume[key];
                    }
                    // there was no total market data in api, so I get percentage of bitcoins' market cap and calculate total market cap.
                    setMarketData({
                        marketCap: parseInt(
                            (data2.data.market_caps[0][1] * 100) /
                                data.data.market_cap_percentage.btc
                        ),
                        marketCapChange:
                            data.data.market_cap_change_percentage_24h_usd,
                        tradingVolume: volume,
                        activeCoins: data.data.active_cryptocurrencies,
                    });
                })
            )
            .catch((error) => console.log(error));
    }, []);
    return (
        <>
            <h1>Cryptocurency Prices By Market Cap</h1>
            <Header marketData={marketData} />
            <main>
                <Table activeCoins={marketData.activeCoins} />
            </main>
        </>
    );
}

export default App;
