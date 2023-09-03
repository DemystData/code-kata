import React from 'react';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4">          
          <li className="text-2xl text-white font-semibold">
            Check Your PreAssessment
          </li>          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
