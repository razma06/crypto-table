import React from "react";
import "./Header.css";

export default function Header({ marketData }) {
    return (
        <header className="flex flex-column">
            <article
                className={
                    marketData.marketCapChange > 0
                        ? "border-green card"
                        : "border-red card"
                }
            >
                <h2>
                    ${marketData.marketCap?.toLocaleString() + " "}
                    <sup
                        className={
                            marketData.marketCapChange > 0
                                ? "up text-green"
                                : "down text-red"
                        }
                    >
                        {marketData.marketCapChange?.toFixed(2)}%
                    </sup>
                </h2>
                <p>Market capitalisation</p>
            </article>
            <article className="card">
                <h2>${marketData?.tradingVolume.toLocaleString()}</h2>
                <p>24th Trading Volume</p>
            </article>
            <article className="card border-gray">
                <h2>{marketData.activeCoins}</h2>
                <p># Of Active Coins</p>
            </article>
        </header>
    );
}
