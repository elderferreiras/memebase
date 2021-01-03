import React from 'react'

const SearchForm = ({ query, setQuery }) => {
  return (
    <form id="form" name="search-query" noValidate="novalidate">
      <div className="control-group">
        <div className="form-group floating-label-form-group controls mb-0 pb-2">
          <label>Search</label>
          <input className="form-control"
                 name="q"
                 type="text"
                 placeholder="Search"
                 required="required"
                 onChange={({ target }) => setQuery(target.value)}
          />
        </div>
      </div>
    </form>
  )
};

export default SearchForm;
