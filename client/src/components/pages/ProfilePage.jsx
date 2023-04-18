import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContextProvider';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
const ProfilePage = () => {
    const {loggedInUser, logout} = useContext(AuthContext);
    console.log(loggedInUser);
  

    return (
        <Layout>
            {/* <p>{loggedInUser.username}</p> */}
            {loggedInUser ? <>欢迎！{loggedInUser.username} <button onClick={logout}>登出</button></> : <> <Link to='/login'>去登陆</Link></>}
        </Layout>
    )
}

export default ProfilePage;