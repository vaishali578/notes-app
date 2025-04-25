import React from 'react';

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="absolute top-6 right-6 px-4 py-2 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-200 transition"
    >
      {darkMode ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}

export default ThemeToggle;
