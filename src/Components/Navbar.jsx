import React from 'react';

const Navbar = () => {
  const logo = "🎮";

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="flex items-center justify-center h-20">
        <div className="flex items-center gap-3 text-center">
          <span className="text-5xl pb-3">{logo}</span>
          <span className="text-4xl font-bold">Tic Tac Toe</span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
