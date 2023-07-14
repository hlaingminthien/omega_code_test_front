import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import UserList from './components/UserList';
import Login from './components/Login';
import UserCreate from './components/UserCreate';
import Report from './components/Report';
import SendMail from './components/SendMail';
import Meta from './components/Meta';

const App = () => {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if the token exists

  const handleLogin = () => {
    setIsLoggedIn(true); // Update the login state
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from local storage
    setIsLoggedIn(false); // Update the login state
    // navigate('/home');
  };

  return (
    <Router>
      {isLoggedIn ? <NavBar onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
      <Routes>
        {isLoggedIn && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<UserList />} />
            <Route path="/newUser" element={<UserCreate />} />
            <Route path="/editUser/:id" element={<UserCreate />} />
            <Route path="/report" element={<Report />} />
            <Route path="/mailing" element={<SendMail />} />
            <Route path="/meta" element={<Meta />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
