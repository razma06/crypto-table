export default function useFilter(data, search) {
    // if there is no search text and price range i just return copy of data or reversed data
    if (search.name === "" && search.priceFrom === 0 && search.priceTo === 0) {
        const filtered = [...data];
        return search.isDesc === "true" ? filtered.reverse() : filtered;
    }

    const priceFromIsZero = search.priceFrom === 0;
    const priceToIsZero = search.priceTo === 0;

    // Filtering data with search(by name or symbol) and pricerange
    const filtered = data?.filter(
        (coin) =>
            (coin.name
                .toLowerCase()
                .includes(search.name.toLowerCase().trim()) ||
                coin.symbol
                    .toLowerCase()
                    .includes(search.name.toLowerCase().trim())) &&
            (priceFromIsZero || coin.current_price >= search.priceFrom) &&
            (priceToIsZero || coin.current_price <= search.priceTo)
    );

    return search.isDesc === "true" ? filtered.reverse() : filtered;
}
