import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthProviderProps, LogInParams, UserCreationRequest } from '../types';
import * as userApi from '../api/user';
import { getAccessToken, setAccessToken } from '../api/authToken';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  logIn: (params: LogInParams) => Promise<void>;
  logOut: () => void;
  register: (request: UserCreationRequest) => Promise<void>;
}

/**
 * The authentication context.
 */
const AuthContext = createContext<AuthContextType>({
  logIn: async () => { },
  logOut: () => { },
  register: async () => { }
});

/**
 * A hook that returns the authentication context.
 * @returns The authentication context.
 */
export const useAuth = () => useContext(AuthContext);

/**
 * The authentication provider component.
 * @param children The child components.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  /**
   * Initialize the authentication context.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken();
      if (!token) {
        // Attempt to refresh token
        try {
          const newAccessToken = await userApi.refreshToken();
          setAccessToken(newAccessToken);
        } catch (error) {
          console.error('Error refreshing token:', error);
          setAccessToken(null); // Ensure no invalid token is present
        }
      }
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  /**
   * Log the user in.
   * @param params The login parameters.
   */
  const logIn = async (params: LogInParams) => {
    const token = await userApi.logIn(params);
    console.log('token received from login', token);
    setAccessToken(token);
  };

  /**
   * Log the user out.
   */
  const logOut = async () => {
    try {
      // Send a request to the logout endpoint
      await userApi.logOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setAccessToken(null); // Clear the access token
    navigate('/login'); // Redirect to login page
  };

  /**
   * Register a new user.
   * @param request The user creation request.
   */
  const register = async (request: UserCreationRequest) => {
    const token = await userApi.registerUser(request);
    console.log('token received from register', token);
    setAccessToken(token);
  };

  if (!isInitialized) {
    return <div>Loading...</div>; // Or any other loading component
  }

  const value = {
    logIn,
    logOut,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
