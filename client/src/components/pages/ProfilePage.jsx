import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContextProvider';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
import instance from '../../services/axiosInit';

const UserBlogs = ({ userId }) => {
    const [blogs, setBlogs] = useState([]);

    const handleDelete = (deleteId) => {
        instance.delete(`/api/posts/${deleteId}`)
        .then((res) => {
            console.log(res.data);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
        
    }

    useEffect(() => {
        function fetchData() {
            instance.get(`/api/users/${userId}/posts`).then((res) => {
                setBlogs(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>我的博客:</h2>
            {
                blogs &&
                blogs.map((blog) =>
                    <div key={blog._id} className='profile_blogs_list'>
                        <Link to={'/blogs/' + blog._id} >
                            {blog.title}
                        </Link>
                        <button onClick={(e) => handleDelete(blog._id)}>删除此文章</button>
                    </div>
                )}

        </div>
    )
}

const UserComments = ({ userId }) => {
    const [comments, setComments] = useState([]);

    const handleDelete = (deleteId) => {
        instance.delete(`/api/comments/${deleteId}`)
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        window.location.reload();
    }

    useEffect(() => {
        function fetchData() {
            instance.get(`/api/users/${userId}/comments`).then((res) => {
                setComments(res.data);
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchData();
    }, []);

    return (
        <div>
            <h2>我的评论：</h2> 
            {
                comments &&
                comments.map((comment) => {
                    return (
                        <div key={comment._id} className='profile_comments_list'>
                            <div><p>{comment.content} </p>
                            来自于 <Link to={'/blogs/' + comment.post_id._id}>{comment.post_id.title}</Link></div>
                            <div> <button onClick={(e) => handleDelete(comment._id)}>删除此评论</button></div>
                        </div>
                    )
                })
            }
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