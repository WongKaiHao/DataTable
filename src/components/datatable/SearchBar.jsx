import { useSearch } from "hooks/useSearch.js";
import React from "react";

const SearchBar = () => {
	const [query, setQuery] = useSearch();

	const inputStyle = {
    width: "40%",
    outline: "none",
    margin: "5px 2px",
    padding: "5px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
  };
  
	return (
		<input
			type="search"
			placeholder="Search"
			value={query}
			onChange={(e) =>
				setQuery(() => e.target.value)
			}
			style={inputStyle}
		/>
	);
};

export default SearchBar;
