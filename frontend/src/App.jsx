import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/LoginForm";
import HrDashboard from "./components/HrDashboard";
import SecurityDashboard from "./components/SecurityDashboard";

export default function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Login
            onLogin={(tk, rl) => {
              setToken(tk);
              setRole(rl);
            }}
          />
        }
      />
      <Route
        path="/hr"
        element={
          role === "hr" ? <HrDashboard token={token} /> : <Navigate to="/" />
        }
      />
      <Route
        path="/security"
        element={
          role === "security" ? (
            <SecurityDashboard token={token} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}
