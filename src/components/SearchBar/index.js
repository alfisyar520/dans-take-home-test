import React, { useState } from "react";

const SearchBar = ({ onSearch, children }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <form onSubmit={handleSubmit} className="d-flex">
          {children}
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
