import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => {
    // Mock login - in real app, call API here
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: email,
      phone: '+1 234 567 8900',
      avatar: 'https://i.pravatar.cc/150?img=12',
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const signup = (name, email, password) => {
    // Mock signup - in real app, call API here
    const mockUser = {
      id: '1',
      name: name,
      email: email,
      phone: '+1 234 567 8900',
      avatar: 'https://i.pravatar.cc/150?img=12',
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const forgotPassword = (email) => {
    // Mock forgot password - in real app, call API here
    return { success: true, message: 'Password reset link sent to your email' };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        signup,
        logout,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);