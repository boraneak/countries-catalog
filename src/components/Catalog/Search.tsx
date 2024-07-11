import React, { useState } from "react";
import { Input } from "antd";

interface SearchProps {
  onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Input
      placeholder="Search by Country Name"
      value={searchQuery}
      onChange={handleSearchChange}
      style={{ width: 300 }}
    />
  );
};

export default Search;
