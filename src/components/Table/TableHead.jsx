import React from "react";

export default function TableHead() {
    return (
        <thead>
            <tr>
                <th className="text-center sticky left-0 bg-gray">#</th>
                <th className="text-left sticky left-5 bg-gray">Coin</th>
                <th className="width-32 hide-900"></th>
                <th>Price</th>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>24h volume</th>
                <th>market cap</th>
            </tr>
        </thead>
    );
}
