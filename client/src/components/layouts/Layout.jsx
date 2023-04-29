import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContextProvider';

const Layout = ({ children }) => {
    const { loggedInUser } = useContext(AuthContext);
    return (
        <div className='mx-auto overflow-hidden'>
            <header className='w-screen shadow-lg flex justify-between px-5 py-3 bg-purple-600 text-white fixed top-0'>
                <ul className='flex'>
                    <li className='mx-3'><Link to='/'>首页</Link></li>
                    <li className='mx-3'><Link to='/about'>关于</Link></li>
                    <li className='mx-3'><Link to='/envirment'>生态系统</Link></li>
                </ul>
                <div className='flex align-middle'>
                    <div className='mx-3'>
                        {loggedInUser ? <><Link to={'/me'}>{loggedInUser.username}</Link> </> : <> <Link to='/login'>登陆/注册</Link></>}
                    </div>

                    <Link to={`https://github.com/cherrieszzz/se6317`}>
                        <svg class='icon' aria-hidden="true"> <use xlinkHref="#icon-github-fill"></use> </svg>
                    </Link>
                </div>
            </header>

            <div className='my-14 mx-auto max-w-screen-md'>
                {children}
            </div>

            <footer className='flex justify-center px-10 py-10 border-1'>
                <hr />
                2023@Copyright powered by vite
            </footer>
        </div>
    )
}

export default Layout;