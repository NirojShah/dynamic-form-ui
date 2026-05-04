import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./component/pages/user/Login";
import Signup from "./component/pages/user/Signup";
import Home from "./component/pages/home/Home";

import getMe from "./utility/auth.api";

import Notifications from "./notification/notification.context";
import GlobalMessage from "./notification/GlobalMessage";

import { setNotifier } from "./notification/notification.service";
import Sample from "./component/Sample";
import userStore from "./store/user.store";
import MainLayout from "./component/pages/home/Home";
import MyForms from "./component/pages/form/myforms/MyForms";
import CreateForm from "./component/pages/form/create-form/CreateForm";
import FormPublic from "./component/pages/Form-Public/FormPublic";

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

  const setUser = userStore((state) => state.setUser);
  // const name = userStore((state) => state.name);

  const notification = Notifications.useNotification();

  useEffect(() => {
    setNotifier(notification);
  }, [notification]);

  const checkIsAuthenticated = async () => {
    try {
      // if (!name) {
      const resp = await getMe();
      setUser({
        userName: resp.data?.name,
        email: resp.data?.email,
        organization: resp.data?.organizationName,
      });
      setIsAuthorized(resp?.status === "success");
      // }
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
          path="/sample"
          element={
            <ProtectedRoute isAuthorized={isAuthorized} loading={loading}>
              <Sample />
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

        <Route path="/home" element={<MainLayout />}>
          <Route index element={
            <ProtectedRoute isAuthorized={isAuthorized} loading={loading}>
              <MyForms />
            </ProtectedRoute>
          } />
          <Route path="create-form" element={
            <ProtectedRoute isAuthorized={isAuthorized} loading={loading}><CreateForm /></ProtectedRoute>
          } />
          <Route path="profile" element={<h1>Profile</h1>} />
          <Route path="myforms" element={<MyForms />} />
          <Route path="shared" element={<h1>Shared with me</h1>} />
          <Route path="templates" element={<h1>Templates</h1>} />
          <Route path="analytics" element={<h1>Analytics</h1>} />
          <Route path="client" element={<h1>Client Work</h1>} />
          <Route path="surveys" element={<h1>Surveys</h1>} />
          <Route path="archive" element={<h1>Archive</h1>} />
          <Route path="integrations" element={<h1>Integrations</h1>} />
          <Route path="settings" element={<h1>Settings</h1>} />
        </Route>

        <Route path="/public/:key" element={<FormPublic />} />
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
