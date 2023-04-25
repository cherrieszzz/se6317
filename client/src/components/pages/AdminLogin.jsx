import React, { Component, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { AuthContext } from '../../contexts/authContextProvider';
import instance from '../../services/axiosInit';

const AdminLogin = () => {

    const { adminLogin, loggedInAdmin } = useContext(AuthContext);

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

    if (loggedInAdmin) {
        navigate('/admin');
    }

    return (
        <div className='flex justify-center'>
            <div className='my-4 border-2 p-3 rounded-lg'>
                <h1 className='text-3xl'>管理员登录</h1>
                <form action="" onSubmit={(e) => handleSubmit(e)} className='container'>
                    <div className='flex justify-between my-2'>
                        <label htmlFor="" className='w-1/4'>用户名</label>
                        <input className='w-3/4 p-1' type="text" name="" id="usernameInput" onChange={(e) => handleUsername(e)} />
                    </div>

                    <div className='flex my-2'>
                        <label className='w-1/4' htmlFor="">密码</label>
                        <input className='w-3/4 p-1' type="password" name="" id="passwordInput" onChange={(e) => handlePassword(e)} />
                    </div>

                    <button type="submit" className='bg-purple-600 border-2 rounded-lg p-1 text-white'>登录</button>
                </form>
            </div>

        </div>

    )
}

export default AdminLogin;