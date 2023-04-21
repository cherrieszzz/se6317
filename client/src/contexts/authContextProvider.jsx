import React, { createContext, useEffect, useState } from 'react';
import instance from '../services/axiosInit';
import { Navigate, useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const login = (username, password) => {
    const loginData = {
      username: username,
      password: password
    }

    instance.post('/auth/login', loginData).
      then((response) => {
        console.log(response.data);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
        localStorage.setItem('authorization', response.data.token);
      }).catch(err => console.log(err));

  };

  const adminLogin = (username, password) => {
    const loginData = {
      username: username,
      password: password
    }

    instance.post('/admin/login', loginData).
      then((response) => {
        console.log(response.data);
        if(response.status == 401) {
           return;
        }
        localStorage.setItem('authorization', response.data.token);
        setIsAdmin(true);
      }).catch(err => console.log(err));

  };

  const signup = (username, email, password) => {
    const loginData = {
      username: username,
      email:email,
      password: password
    }

    instance.post('/auth/signup', loginData).
      then((response) => {
        console.log(response.data);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
        localStorage.setItem('authorization', response.data.token);
      }).catch(err => console.log(err));
  }

  const logout = () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('authorization');
    window.location.reload();
  }

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout, signup, adminLogin ,isAdmin}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;