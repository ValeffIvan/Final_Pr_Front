import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

import Login from "./components/Usuario/Login";
import Home from './pages/Home'
import Perfil from './pages/Usuario'
import Usuarios from "./pages/Comunidad";
import Navbar from "./components/Navbar/Navbar";
import ChangePassword from "./components/Usuario/ChangePassword"
import { AuthProvider } from "./AuthVerify/AuthContext";
import { Redirect } from "./AuthVerify/Redirect";
import "./App.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";


export const App = () => {

  return (
    <AuthProvider>
      <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/"/>} />

            <Route element={<Redirect/>}>
              <Route path="/cambiarPassword" element={<ChangePassword />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>
            
          </Routes>
      </Router>
    </AuthProvider>
  );
}

