import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContextProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const {login} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("user: " + username + " password: " + password);
        login(username, password);
        navigate('/me');
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
        <form action="" onSubmit={(e) => handleSubmit(e)} className='container'>
            <label htmlFor="">用户名</label>
            <input type="text" name="" id="usernameInput" onChange={(e) => handleUsername(e)}/>
            <label htmlFor="">密码</label>
            <input type="password" name="" id="passwordInput" onChange={(e) => handlePassword(e)}/>
            <button type="submit">登录</button>
        </form>
    )
}

export default LoginPage;