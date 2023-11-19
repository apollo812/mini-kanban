import React from "react";

function SearchForm({ updateSearchTerm, searchTerm }) {
  function handleTextChange(e) {
    updateSearchTerm(e.target.value);
  }

  return (
    <div className="row">
      <div className="input-group col-md-4">
        <input
          className="form-control"
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
