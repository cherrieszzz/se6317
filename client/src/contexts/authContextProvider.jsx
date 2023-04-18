import React, { createContext, useEffect, useState } from 'react';
import instance from '../services/axiosInit';
import { Navigate, useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const login = (username, password) => {
        const loginData = {
            username : username,
            password : password
        }

        instance.post('/auth/login', loginData).
            then((response) => {
                console.log(response.data);
                sessionStorage.setItem('user', JSON.stringify(response.data) );
                setLoggedInUser(JSON.parse( sessionStorage.getItem('user') ));
                localStorage.setItem('authorization', response.data.token);
            }).catch(err => console.log(err));
    
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('authorization');
    navigate('/');
  }

  useEffect(()=> {
    setLoggedInUser(JSON.parse( sessionStorage.getItem('user') ));
  },[loggedInUser]);

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;