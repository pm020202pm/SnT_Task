
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './student/HomePage';
import AdminPage from './admin/AdminPage';
import CourseDetail from './admin/CourseDetail';
import SignUpPage from './pages/SignUpPage';

const App = () => {
  const isLoggedIn = () => {
    return !!localStorage.getItem('token');
  };

  const isAdminLoggedIn = () => {
    return !!localStorage.getItem('token') && localStorage.getItem('isAdmin') === 'true';
  }
  const AdminRoute = ({ children }) => {
    console.log("admin route");
    return isAdminLoggedIn() ? children : <Navigate to="/login" replace />;
  };  

  const PrivateRoute = ({ children }) => {
    console.log("private route");
    return isLoggedIn() ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage/>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage/>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/:code"
          element={
            <AdminRoute>
              <CourseDetail/>
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;