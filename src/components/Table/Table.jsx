import React, { useEffect, useState } from "react";
import axios from "axios";
import useFilter from "../../useFilter";
import Row from "../Row/Row";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import "./Table.css";
import TableHead from "./TableHead";

export default function Table({ activeCoins }) {
    // main data from pages and page state
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    // loading state. Not boolean just string, so it will take up space on the screen all the time.
    const [isLoading, setIsLoading] = useState("Loading...");
    // this is search state, to filter the data.
    const [search, setSearch] = useState({
        name: "",
        priceFrom: 0,
        priceTo: 0,
        isDesc: false,
    });

    // sending a request everytime page state changes and controlling loading and data states. after a response it scrolls to top.
    useEffect(() => {
        setIsLoading("Loading...");
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
            )
            .then((response) => {
                setData(response.data);
                if (response.data.length === 0) {
                    setIsLoading("There is no data");
                } else {
                    console.log("else");
                    setIsLoading("");
                }
            })
            .catch((error) => {
                setIsLoading(`error happened: ${error}}`);
                console.log(error);
            })
            .finally(() => window.scroll(0, 0));
    }, [page]);

    const filteredData = useFilter(data, search);

    return (
        <>
            <Search setSearch={setSearch} search={search} />
            <div className="scroll">
                <table>
                    <TableHead />
                    <tbody>
                        {filteredData?.map((rowData, index) => (
                            <Row
                                coin={rowData}
                                index={index}
                                page={page}
                                search={search}
                                key={
                                    rowData.market_cap_rank ||
                                    (search.isDesc === "true"
                                        ? (page + 1) * 20 - index - 10
                                        : page * 20 + index - 9)
                                }
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <h2
                className="text-center text-blue margin-block-1"
                style={{ height: "1rem" }}
            >
                {isLoading}
            </h2>

            {activeCoins > 0 && (
                <Pagination
                    setPage={setPage}
                    activeCoins={activeCoins}
                    page={page}
                />
            )}
        </>
    );
}
