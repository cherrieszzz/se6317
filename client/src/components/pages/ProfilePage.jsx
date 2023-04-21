import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContextProvider';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
import instance from '../../services/axiosInit';

const UserBlogs = ({userId}) => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        function fetchData() {
            instance.get(`/api/users/${userId}/posts`).then((res) => {
                setBlogs(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchData();
    },[]);

    return (
        <div>
            我的博客:
            {blogs && blogs.map((blog) => <div key={blog._id}>{blog.title} </div>)}
        </div>
    )
}

const UserComments = ({userId}) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        function fetchData() {
            instance.get(`/api/users/${userId}/comments`).then((res) => {
                setComments(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchData();
    },[]);

    return (
        <div>
             我的评论：
            {comments && comments.map((comment) => <div key={comment._id}>{comment.content}</div>)}
        </div>
    )
}

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

    return (
        <Layout>
            {/* <p>{loggedInUser.username}</p> */}
            欢迎！{loggedInUser.username} <button onClick={logout}>登出</button>
            <UserBlogs userId={loggedInUser.id} />
            <UserComments userId={loggedInUser.id} />
           
        </Layout>
    )
}

export default ProfilePage;