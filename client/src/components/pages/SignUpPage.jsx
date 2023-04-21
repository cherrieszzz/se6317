import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContextProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const { loggedInUser ,signup} = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("user: " + username + " password: " + password);
        signup(username, email,  password);
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

    if(loggedInUser) {
        return (
            <div>请先登出</div>
        )
    }

    return (
        <form action="" onSubmit={(e) => handleSubmit(e)} className='container'>
            <label htmlFor="">用户名</label>
            <input type="text" name="" id="usernameInput" onChange={(e) => handleUsername(e)}/>
            <label htmlFor="">邮箱</label>
            <input type="email" name="" id="" onChange={e => setEmail(e.target.value)}/>
            <label htmlFor="">密码</label>
            <input type="password" name="" id="passwordInput" onChange={(e) => handlePassword(e)}/>
          
            <button type="submit">注册</button>
        </form>
    )
}

export default SignUpPage;