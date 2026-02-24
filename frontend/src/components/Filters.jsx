import React from "react";

const Filters = ({ sort, setSort }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <select
        // value={sort}
        // onChange={(e) => setSort(e.target.value)}

     value={sort} onChange={(e) => setSort(e.target.value)}
        style={{ padding: "8px", borderRadius: "6px" , border: '2px solid #f6f6f6' }}
      >
        <option value="">Sort By Price</option>
        <option value="low">Low to High</option>
        <option value="high">High to Low</option>
      </select>
    </div>
  );
};

export default Filters;