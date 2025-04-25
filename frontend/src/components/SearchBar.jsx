import React from 'react';

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="🔍 Search notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
    />
  );
}

export default SearchBar;
