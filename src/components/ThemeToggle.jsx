// ThemeToggle.js
import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="w-11/12 mx-auto flex justify-end">
      <input 
        type="checkbox" 
        className="toggle toggle-lg bg-gray-500" 
        checked={isDarkMode} 
        onChange={toggleTheme} 
      />
    </div>
  );
};

export default ThemeToggle;
