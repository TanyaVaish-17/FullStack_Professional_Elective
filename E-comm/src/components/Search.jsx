import { useState, useEffect } from "react";

export default function Search({ products, setFilteredProducts }) {
  const [find, setFind] = useState("");

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(find.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [find, products, setFilteredProducts]);

  return (
    <>
      <h2>Search bar</h2>
      <input
        type="text"
        placeholder="Enter key to search"
        value={find}
        onChange={(e) => setFind(e.target.value)}
      />
    </>
  );
}