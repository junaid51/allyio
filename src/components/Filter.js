import React, { useState } from "react";
import "../styles/filter.css";

const Filter = ({ filterData }) => {
  const [filter, setFilter] = useState(""); // state to track current user input

  const onChangeFilter = (e) => {
    // once user input changes, filter the entire data
    setFilter(e.target.value);
    filterData(e.target.value); // passed as a prop from parent to modify the data set
  };

  return (
    <div className="filter">
      <input
        name="filter"
        onChange={onChangeFilter}
        value={filter}
        placeholder="Filter by category..."
      />
    </div>
  );
};

export default Filter;
