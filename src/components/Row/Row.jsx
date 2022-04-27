import React from "react";
import "./Row.css";

const textcolorClass = (percentage) => {
    return percentage >= 0 ? "text-green" : "text-red";
};

export default function Row({ coin, index, page, search }) {
    return (
        <tr>
            <td className="sticky left-0 bg-white">
                <div className="flex text-right justify-center">
                    <button>
                        <img src="star-solid.svg" alt="star" width={20} />
                    </button>
                    <span>
                        {coin.market_cap_rank ||
                            (search.isDesc === "true"
                                ? page * 20 - index
                                : (page - 1) * 20 + index + 1)}
                    </span>
                </div>
            </td>
            <td className="text-left flex align-center sticky left-5 bg-white">
                <img
                    src={coin.image}
                    alt="coin icon"
                    width="25px"
                    height="25px"
                />
                <p>
                    <b>{coin.name}</b>
                </p>
            </td>
            <td className="text-left uppercase hide-900">{coin.symbol}</td>
            <td>${coin.current_price}</td>
            <td
                className={textcolorClass(
                    coin.price_change_percentage_1h_in_currency
                )}
            >
                {coin.price_change_percentage_1h_in_currency?.toFixed(1)}%
            </td>
            <td
                className={textcolorClass(
                    coin.price_change_percentage_24h_in_currency
                )}
            >
                {coin.price_change_percentage_24h_in_currency?.toFixed(1)}%
            </td>
            <td
                className={textcolorClass(
                    coin.price_change_percentage_7d_in_currency
                )}
            >
                {coin.price_change_percentage_7d_in_currency?.toFixed(1)}%
            </td>
            <td>${coin.total_volume?.toLocaleString()}</td>
            <td>${coin.market_cap?.toLocaleString()}</td>
        </tr>
    );
}
