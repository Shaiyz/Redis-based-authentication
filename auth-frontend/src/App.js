import React, { useContext, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/Login';
import Home from './components/Home';  // A protected page after sign-in

 const SignInRedirect = () => {
  const state = useContext(AuthContext);  
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state)
    if (state?.token) {
      navigate('/home'); 
    }
  }, [state?.token, navigate]);

  return null;  
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route 
            path="/signup" 
            element={
              <>
                <SignInRedirect />
                <SignUpPage />
              </>
            }
          />
          <Route 
            path="/" 
            element={
              <>
                <SignInRedirect />
                <SignInPage />
              </>
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
