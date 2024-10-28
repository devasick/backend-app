// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./component/users/Dashboard";
import Login from "./component/users/Login";
import Users from "./component/users/Users";
import AddUser from "./component/users/AddUser";
import EditUser from "./component/users/EditUser";
import Categories from "./component/categories/Categories";
import AddCategory from "./component/categories/AddCategory";
import EditCategory from "./component/categories/EditCategory";
import MenuItems from "./component/menu/MenuItems";
import AddMenuItem from "./component/menu/AddMenuItem";
import EditMenuItem from "./component/menu/EditMenuItem";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

const PublicRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/dashboard" /> : children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}

        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/add"
          element={
            <PrivateRoute>
              <AddUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/edit/:id"
          element={
            <PrivateRoute>
              <EditUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/add"
          element={
            <PrivateRoute>
              <AddCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <PrivateRoute>
              <EditCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/menu-items"
          element={
            <PrivateRoute>
              <MenuItems />
            </PrivateRoute>
          }
        />
        <Route
          path="/menu-items/add"
          element={
            <PrivateRoute>
              <AddMenuItem />
            </PrivateRoute>
          }
        />
        <Route
          path="/menu-items/edit/:id"
          element={
            <PrivateRoute>
              <EditMenuItem />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
