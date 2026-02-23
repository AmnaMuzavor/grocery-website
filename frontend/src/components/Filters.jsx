import React from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Filters = ({ category, setCategory, sort, setSort }) => {
  return (
    <div className="filters">
<FontAwesomeIcon icon={faFilter} />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Snacks">Snacks</option>
        <option value="Beverages">Beverages</option>
        <option value="Dairy">Dairy</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>

    </div>
  );
};

export default Filters;