import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <h1>Notifications</h1>
      <p>Stay Updated with platform changes and account activity</p>
      <div>
        <div>
          <Link to="/">All</Link>
        </div>
        <div>
          <Link to="/unread">Unread</Link>
        </div>
        <div>
          <Link to="/seen">Seen</Link>
        </div>
      </div>
    </div>
  );
}
