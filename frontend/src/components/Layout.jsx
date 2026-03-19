import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
export default function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1 py-4 py-md-5">
        <Container style={{ maxWidth: "900px" }}>
          <Outlet />
        </Container>
      </main>
      <footer className="py-5 mt-auto border-top bg-white bg-opacity-50">
        <Container className="text-center">
          <p className="text-muted small m-0">
            AlertCenter &bull; Built with precision for local monitoring
          </p>
        </Container>
      </footer>
    </div>
  );
}