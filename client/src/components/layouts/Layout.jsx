import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContextProvider';

const Layout = ({ children }) => {
    const { loggedInUser } = useContext(AuthContext);
    return (
        <div>
            <header className='w-screen shadow-lg flex justify-between px-5 py-3 bg-blue text-white'>
                <ul className='flex'>
                    <li className='mx-3'><Link to='/'>首页</Link></li>
                    <li className='mx-3'><Link to='/'>关于</Link></li>
                    <li className='mx-3'><Link to='/'>生态系统</Link></li>
                </ul>
                <div>
                    {loggedInUser ? <><Link to={'/me'}>{loggedInUser.username}</Link> </> : <> <Link to='/login'>登陆/注册</Link></>}
                </div>
            </header>

            <div className='my-5 mx-10'>
                {children}
            </div>
            <footer className='flex justify-center'>
                2023@Copyright powered by vite
            </footer>
        </div>
    )
}

export default Layout;