import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/pages/user/Login";
import Signup from "./component/pages/user/Signup";
import getMe from "./utility/auth.api";
import Home from "./component/pages/home/Home";

const ProtectedRoute = ({ isAuthorized, loading, children }) => {
  if (loading) return <h1>Loading...</h1>;
  return isAuthorized ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isAuthorized, loading, children }) => {
  if (loading) return <h1>Loading...</h1>;
  return isAuthorized ? <Navigate to="/" replace /> : children;
};

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkIsAuthenticated = async () => {
    try {
      const resp = await getMe();

      setIsAuthorized(resp?.status === "success");
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute isAuthorized={isAuthorized} loading={loading}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute isAuthorized={isAuthorized} loading={loading}>
              <Signup />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthorized={isAuthorized} loading={loading}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            loading ? (
              <h1>Loading...</h1>
            ) : isAuthorized ? (
              <Navigate to="/sample" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
