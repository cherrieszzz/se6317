import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContextProvider';
import { Navigate, useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const { login } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("user: " + username + " password: " + password);
        login(username, password);
        navigate(-1);
    }

    function handleUsername(e) {
        setUsername(e.target.value);
        console.log(username);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
        console.log(password);
    }

    return (
        <div className='container max-w-sm mx-auto shadow-lg p-7'>
            <div>
                <h1 className='text-lg'>登录</h1>
            </div>
            <form action="" onSubmit={(e) => handleSubmit(e)} className='container'>
                <div className='flex justify-between my-3'>
                    <label htmlFor="" className='w-1/4'>用户名</label>
                    <input className='w-3/4' type="text" name="" id="usernameInput" onChange={(e) => handleUsername(e)} />
                </div>

                <div className='flex justify-between my-3'>
                    <label htmlFor="" className='w-1/4'>密码</label>
                    <input className='w-3/4' type="password" name="" id="passwordInput" onChange={(e) => handlePassword(e)} />
                </div>

                <div className='flex justify-between my-3 align-middle'>
                    <Link to={'/signup'} className='text-purple-600'>没有用户？请注册</Link>
                    <button type="submit" className='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'>登录</button>
                </div>

            </form>
        </div>

    )
}

export default LoginPage;