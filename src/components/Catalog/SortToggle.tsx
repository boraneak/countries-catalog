import React from "react";

interface SortToggleProps {
  onSortChange: (sortOrder: "asc" | "desc") => void;
}

const SortToggle: React.FC<SortToggleProps> = ({ onSortChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as "asc" | "desc");
  };

  return (
    <div style={{ marginBottom: "20px", textAlign: "center" }}>
      <label htmlFor="sortOrder">Sort by Country Name: </label>
      <select id="sortOrder" onChange={handleSortChange}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
    </div>
  );
};

export default SortToggle;
