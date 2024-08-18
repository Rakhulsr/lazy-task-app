import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Homepage from "../src/pages/Homepage.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import SignupPage from "../src/pages/SignupPage.jsx";
import Drawer from "../src/components/Drawer.jsx";
import Dashboard from "../src/pages/app/Dashboard.jsx";
import Trash from "../src/pages/app/Trash.jsx";

function App() {
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);

        return null;
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const isAuthenticated = authUser && authUser.id;

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/login"
        element={
          !isAuthenticated ? <LoginPage /> : <Navigate to="/app/dashboard" />
        }
      />
      <Route
        path="/signup"
        element={
          !isAuthenticated ? <SignupPage /> : <Navigate to="/app/dashboard" />
        }
      />
      <Route
        path="/app"
        element={isAuthenticated ? <Drawer /> : <Navigate to="/login" />}
      >
        <Route
          path="dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="trash"
          element={isAuthenticated ? <Trash /> : <Navigate to="/login" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
