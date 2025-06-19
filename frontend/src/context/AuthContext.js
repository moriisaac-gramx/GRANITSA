import { createContext, useState, useEffect } from 'react';
import { getToken, saveToken, removeToken } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ loggedIn: true });
    }
    setLoading(false);
  }, []);

  const loginUser = (token) => {
    saveToken(token);
    setUser({ loggedIn: true });
  };

  const logoutUser = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
