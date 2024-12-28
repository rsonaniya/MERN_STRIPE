import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Cart from "./pages/Cart";
import RedirectPage from "./pages/RedirectPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />

      <Route
        path="/cart"
        element={
          <Layout>
            <Cart />
          </Layout>
        }
      />
      <Route
        path="/order-success"
        element={<RedirectPage status="success" />}
      />
      <Route path="/order-failure" element={<RedirectPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
