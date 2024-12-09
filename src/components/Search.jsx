
import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
  const [input, setInput] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search products..."
        className="pa2 ba b--black-20"
      />
      <button type="submit" className="pa2 ba b--black-20 ml2">
        Search
      </button>
    </form>
  );
};

export default Search;