import React, { createContext, useEffect, useState } from 'react';
import instance from '../services/axiosInit';
import { Navigate, useNavigate } from 'react-router-dom';
export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInAdmin, setLoggedInAdmin] = useState(null);
  const navigate = useNavigate();

  const login = (username, password) => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('adminUser');
    sessionStorage.removeItem('authorization');
    const loginData = {
      username: username,
      password: password
    }

    instance.post('/auth/login', loginData).
      then((response) => {
        console.log(response.data);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
        sessionStorage.setItem('authorization', response.data.token);
        window.location.reload();
      }).catch(err => console.log(err));

  };

  const adminLogin = (username, password) => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('adminUser');
    sessionStorage.removeItem('authorization');
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
        sessionStorage.setItem('authorization', response.data.token);
        sessionStorage.setItem('adminUser', JSON.stringify(response.data));
        setLoggedInAdmin(JSON.parse(sessionStorage.getItem('adminUser')));
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
        sessionStorage.setItem('authorization', response.data.token);
      }).catch(err => console.log(err));
  }

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authorization');
    window.location.reload();
  }

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('user')));
    setLoggedInAdmin(JSON.parse(sessionStorage.getItem('adminUser')));
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout, signup, adminLogin ,loggedInAdmin}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;