import { FiSearch } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;

    setSearchQuery(value);
    onSearch(value);
  };

  return (
   <div className="search-container">
  <FiSearch className="search-icon" />

  <input
    ref={inputRef}
    type="text"
    placeholder="Search books..."
    value={searchQuery}
    onChange={handleChange}
  />
</div>
  );
}

export default SearchBar;