import React from "react";
import { Helmet, HelmetProvider } from  'react-helmet-async'
import '../App.css';
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Manage from "./Manage";
import ForgotPassword from "./ForgotPassword";
import Audio from "./Audio";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Redirects to login page if user is not logged in
const Private = ({ Component }) => {
  const { currentUser } = useAuth()

  return currentUser ? <Component /> : <Navigate to="/login" />
}

function App() {
  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>mpthree</title>
        </Helmet>
        <main className="App-main">
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
        </main>
        <footer>
          <p>mpthree - by <a href="https://slw.one/">Samuel Ward</a> (2024)</p>
        </footer>
      </div>
    </HelmetProvider>
  );
}

export default App;
