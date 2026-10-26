import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center gap-2" href="#">
          <span className="navbar-icon">🅿️</span>
          <div>
            <div className="brand-title">ParkEase</div>
            <div className="brand-subtitle">Session Management System</div>
          </div>
        </a>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            <li className="nav-item">
              <span className="nav-link text-white opacity-75 small">
                KLEF SOA Docker Assignment
              </span>
            </li>
            <li className="nav-item">
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill fw-semibold">
                Live System
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
