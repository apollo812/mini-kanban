import React from "react";

function SearchForm({ updateSearchTerm, searchTerm }) {
  function handleTextChange(e) {
    updateSearchTerm(e.target.value);
  }

  return (
    <div className="">
      <div className="">
        <input
          className="focus:border-2 focus:border-blue-400 focus:outline-0 rounded-lg"
          type="text"
          value={searchTerm}
          placeholder="Search tasks..."
          onChange={handleTextChange}
        />
      </div>
    </div>
  );
}

export default SearchForm;
