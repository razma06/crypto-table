/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./Pagination.css";

export default function Pagination({ setPage, page, activeCoins }) {
    // getting maxpage and generating numbers array from 0 to maxpage-1 to get page numbers
    const maxPage = Math.floor(activeCoins / 20);
    const numbers = maxPage > 1 ? [...Array(maxPage).keys()] : [];

    const [currentButtons, setCurrentButtons] = useState([0, 1, 2, 3]);

    useEffect(() => {
        // useEffect for controlling pagination compontent by changing currentButtons state
        if (page < 5) {
            setCurrentButtons([...numbers.slice(0, page + 3), "...", maxPage]);
        } else if (page < maxPage - 3) {
            if (
                page === currentButtons[2] + 1 ||
                page === currentButtons[currentButtons.length - 3] + 1
            ) {
                setCurrentButtons([
                    0,
                    "...",
                    ...numbers.slice(page - 4, page + 3),
                    "...",
                    maxPage,
                ]);
            }
        } else {
            setCurrentButtons([
                1,
                "...",
                ...numbers.slice(page - 4, maxPage + 1),
                maxPage,
            ]);
        }
    }, [page]);

    const handleClick = (number) => {
        if (typeof number === "number") {
            setPage(number + 1);
        }
    };

    return (
        <>
            <div className="pagination-container margin-block-1">
                <a href="#/" onClick={() => page !== 1 && setPage(page - 1)}>
                    Prev
                </a>
                {currentButtons.map((numberOfPage, index) => {
                    return (
                        <a
                            href="#/"
                            className={
                                page === numberOfPage + 1 ? "active" : undefined
                            }
                            onClick={() => handleClick(numberOfPage)}
                            key={index}
                        >
                            {numberOfPage !== "..."
                                ? numberOfPage + 1
                                : numberOfPage}
                        </a>
                    );
                })}
                <a
                    href="#/"
                    onClick={() =>
                        page !== maxPage + 1 && setPage(() => page + 1)
                    }
                >
                    Next
                </a>
            </div>
        </>
    );
}
