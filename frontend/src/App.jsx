import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AllMessages from "./pages/AllMessages";
import Unread from "./pages/Unread";
import Read from "./pages/Read";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AllMessages />} />
          <Route path="/unread" element={<Unread />} />
          <Route path="/seen" element={<Read />} />
        </Route>
      </Routes>
    </div>
  );
}
