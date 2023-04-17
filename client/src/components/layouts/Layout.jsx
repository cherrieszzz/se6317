import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <>
            <ul>
                <li><Link to='/'>首页</Link></li>
                <li><Link to='/'>关于</Link></li>
                <li><Link to='/'>生态系统</Link></li>
            </ul>
            <div>
                {children}
            </div>
            <footer>
                2023@Copyright powered by vite
            </footer>
        </>
    )
}

export default Layout;