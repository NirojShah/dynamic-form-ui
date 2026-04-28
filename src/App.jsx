import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/pages/user/Login";
import Signup from "./component/pages/user/Signup";
import Home from "./component/pages/home/Home";

import getMe from "./utility/auth.api";

import Notifications from "./notification/notification.context";
import GlobalMessage from "./notification/GlobalMessage";

import { setNotifier } from "./notification/notification.service";

const ProtectedRoute = ({ isAuthorized, loading, children }) => {
  if (loading) return <h1>Loading...</h1>;

  return isAuthorized ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isAuthorized, loading, children }) => {
  if (loading) return <h1>Loading...</h1>;

  return isAuthorized ? <Navigate to="/" replace /> : children;
};

const AppContent = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const notification = Notifications.useNotification();

  useEffect(() => {
    setNotifier(notification);
  }, [notification]);

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
      <GlobalMessage />

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
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Notifications.NotificationProvider>
      <AppContent />
    </Notifications.NotificationProvider>
  );
};

export default App;
