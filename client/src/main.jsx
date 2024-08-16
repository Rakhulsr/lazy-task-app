// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./index.css";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";

import Drawer from "./components/Drawer.jsx";
import Homepage from "./pages/Homepage.jsx";
import Dashboard from "./pages/app/Dashboard.jsx";
import Trash from "./pages/app/Trash.jsx";
//
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/app" element={<Drawer />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="trash" element={<Trash />} />
      </Route>
    </Routes>
  </Router>
  // </StrictMode>
);
