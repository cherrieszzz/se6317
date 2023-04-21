import React, { Component, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { AuthContext } from '../../contexts/authContextProvider';
import instance from '../../services/axiosInit';

const AdminLogin = () => {

    const {adminLogin, isAdmin} = useContext(AuthContext);

    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("user: " + username + " password: " + password);
        adminLogin(username, password);
        navigate('/admin');
    }

    function handleUsername(e) {
        setUsername(e.target.value);
        console.log(username);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
        console.log(password);
    }

    if(isAdmin) {
        navigate('/admin');
    }

    return (
        <form action="" onSubmit={(e) => handleSubmit(e)} className='container'>
            <label htmlFor="">管理员用户名</label>
            <input type="text" name="" id="usernameInput" onChange={(e) => handleUsername(e)}/>
            <label htmlFor="">密码</label>
            <input type="password" name="" id="passwordInput" onChange={(e) => handlePassword(e)}/>
            <button type="submit">登录</button>
        </form>
    )
}

export default AdminLogin;