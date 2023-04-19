import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContextProvider';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
import instance from '../../services/axiosInit';

const ProfilePage = () => {
    const { loggedInUser, logout } = useContext(AuthContext);
    console.log(loggedInUser);

    if (!loggedInUser) {
        return (
            <Layout>
                <Link to='/login'>去登陆</Link>
            </Layout>
        )
    }

    useEffect(() => {
        instance.get('/api/post')
    })

    return (
        <Layout>
            {/* <p>{loggedInUser.username}</p> */}
            欢迎！{loggedInUser.username} <button onClick={logout}>登出</button>

        </Layout>
    )
}

export default ProfilePage;