import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContextProvider';

const Layout = ({ children }) => {
    const { loggedInUser } = useContext(AuthContext);
    return (
        <div>
            <header>
                <ul>
                    <li><Link to='/'>首页</Link></li>
                    <li><Link to='/'>关于</Link></li>
                    <li><Link to='/'>生态系统</Link></li>
                </ul>
                <div>
                    {loggedInUser ? <>欢迎！<Link to={'/me'}>{loggedInUser.username}</Link> </> : <> <Link to='/login'>去登陆</Link></>}
                </div>
            </header>

            <div className='container'>
                {children}
            </div>
            <footer>
                2023@Copyright powered by vite
            </footer>
        </div>
    )
}

export default Layout;