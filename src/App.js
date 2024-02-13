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
import Comunidad from "./pages/Comunidad";
import Navbar from "./components/Navbar/Navbar";
import { AuthProvider } from "./components/AuthVerify/AuthContext";
import { Redirect } from "./components/AuthVerify/Redirect";
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
              <Route path="/comunidad" element={<Comunidad />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>
            
          </Routes>
      </Router>
    </AuthProvider>
  );
}

