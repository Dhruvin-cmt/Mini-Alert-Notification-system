import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiNotification3Line } from "react-icons/ri";

export default function Navbar() {
  const location = useLocation();

  const navLinks = [
    { name: "All", path: "/" },
    { name: "Unread", path: "/unread" },
    { name: "Seen", path: "/seen" },
  ];

  return (
    <nav className="sticky-top py-3 glass-nav border-bottom">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
        <Link to="/" className="text-decoration-none d-flex align-items-center gap-2">
          <div className="bg-primary p-2 rounded-3 text-white shadow-sm">
            <RiNotification3Line size={24} />
          </div>
          <div className="lh-sm">
            <h5 className="m-0 fw-bold text-dark">AlertCenter</h5>
            <span className="text-muted smallest opacity-75">Stay updated locally</span>
          </div>
        </Link>

        <div className="d-flex align-items-center gap-1 bg-white bg-opacity-50 p-1 rounded-pill border shadow-sm">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-pill text-decoration-none small transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-sm fw-semibold"
                    : "text-muted hover-bg-light"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
