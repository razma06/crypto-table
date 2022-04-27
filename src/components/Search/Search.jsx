import React from "react";
import "./Search.css";

export default function Search({ setSearch, search }) {
    // this are functions that are used in while inputs change
    const handleChange = (e) => {
        setSearch({ ...search, name: e.target.value });
    };

    const handlePriceFrom = (e) => {
        setSearch({ ...search, priceFrom: parseInt(e.target.value) || 0 });
    };
    const handlePriceTo = (e) => {
        setSearch({ ...search, priceTo: parseInt(e.target.value) || 0 });
    };

    const handleSelect = (e) => {
        setSearch({ ...search, isDesc: e.target.value });
    };

    return (
        <article className="flex flex-column margin-block-1">
            <div>
                <select onChange={handleSelect}>
                    <option value="false">asc</option>
                    <option value="true">desc</option>
                </select>
                <input
                    type="text"
                    className="search margin-left-1"
                    placeholder="Search by coin"
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="number"
                    className="search width-7"
                    placeholder="Price from"
                    min="0"
                    onChange={handlePriceFrom}
                />
                <input
                    type="number"
                    className="search width-7 margin-left-1"
                    placeholder="Price to"
                    min="0"
                    onChange={handlePriceTo}
                />
            </div>
        </article>
    );
}
