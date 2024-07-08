import React from 'react';
import './home.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title"> Job<span style={{ color: 'grey' }}>Digest</span></div>
      <ul>
        <li>
          <a href="/"> Home</a>
        </li>
        <li>
          <a href="/addJob"> Add Jobs</a>
        </li>
        <li>
          <a href="/getJobs"> View Job</a>
        </li>
        <li>
          <a href='/login'><span style={{ color: 'grey' }}>Login</span></a> 
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;