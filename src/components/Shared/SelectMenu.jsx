import React from "react";

const SelectMenu = ({ selectedFilter, handleFilterChange }) => {
  
  return (
    <div style={{ marginTop: "1rem" }}>
      <select
        id="filter"
        name="filter"
        value={selectedFilter}
        onChange={handleFilterChange}
        className="filter"
      >
        <option className="filter-option" value="All">
          All
        </option>
        <option className="filter-option" value="Approved">
          Approved
        </option>
        <option className="filter-option" value="Canceled">
          Canceled
        </option>
        <option className="filter-option" value="Pending">
          Pending
        </option>
      </select>
    </div>
  );
};

export default SelectMenu;
