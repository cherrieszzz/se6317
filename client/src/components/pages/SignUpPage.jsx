import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContextProvider';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const { loggedInUser, signup } = useContext(AuthContext);

    function handleSubmit(e) {
        e.preventDefault();
        console.log("user: " + username + " password: " + password);
        signup(username, email, password);
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

    if (loggedInUser) {
        return (
            <div>请先登出</div>
        )
    }

    return (
        <div className='flex justify-center'>
            <div className='border-2 rounded-lg p-5'>
                <h1 className='text-3xl'>注册</h1>
                <form action="" onSubmit={(e) => handleSubmit(e)} className='container'>
                    <div className='flex justify-between my-3 '>
                        <label htmlFor="" className='w-1/4'>用户名</label>
                        <input   className='w-3/4 border-2 rounded-md' type="text" name="" id="usernameInput" onChange={(e) => handleUsername(e)} />
                    </div>

                    <div className='flex justify-between my-3'>
                        <label htmlFor="" className='w-1/4'>邮箱</label>
                        <input  className='w-3/4 border-2 rounded-md' type="email" name="" id="" onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className='flex justify-between my-3'>
                        <label className='w-1/4' htmlFor="">密码</label>
                        <input  className='w-3/4 border-2 rounded-md' type="password" name="" id="passwordInput" onChange={(e) => handlePassword(e)} />
                    </div>


                    <button type="submit" className='border-2 rounded-md bg-purple-600 p-1 text-white'>注册</button>
                </form>
            </div>

        </div>

    )
}

export default SignUpPage;