import React from "react";
import logo from '../logo.svg';
import '../App.css';
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Manage from "./Manage";
import ForgotPassword from "./ForgotPassword";
import Audio from "./Audio";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Private = ({ Component }) => {
  const { currentUser } = useAuth()

  return currentUser ? <Component /> : <Navigate to="/login" />
}

function App() {
  return (
    <div className="App">
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/manage" element={<Private Component={Manage} />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/audio/:_id" element={<Audio />} />
            </Routes>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
