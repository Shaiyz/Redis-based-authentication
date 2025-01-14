import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => {
    const savedtoken = localStorage.getItem('token');
    
    return savedtoken ? JSON.parse(savedtoken) : null;
  });


  useEffect(() => {
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(user));

    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');

    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser,token,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
