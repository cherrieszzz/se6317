import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/authContextProvider';
import Layout from '../layouts/Layout';
import { Link } from 'react-router-dom';
import instance from '../../services/axiosInit';
import "tailwindcss/tailwind.css"

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
            <h2 className='text-lg'>我的博客:</h2>
            <div>
                {
                    blogs &&
                    blogs.map((blog) =>
                        <div key={blog._id} className='my-6 shadow-md py-3 px-3 flex justify-between'>
                            <Link to={'/blogs/' + blog._id} className='' >
                                {blog.title}
                            </Link>
                            <button onClick={(e) => handleDelete(blog._id)}>x</button>
                        </div>
                    )}
            </div>
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
            <h2 className='text-lg'>我的评论：</h2>
            <div>
                {
                    comments &&
                    comments.map((comment) => {
                        return (
                            <div key={comment._id} className='my-6 shadow-md p-3 flex justify-between'>
                                <div>
                                    <p>{comment.content} </p>
                                    来自于 <Link to={'/blogs/' + comment.post_id._id}>{comment.post_id.title}</Link>
                                </div>
                                <div> 
                                    <button onClick={(e) => handleDelete(comment._id)}>x</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

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
            <div className='flex justify-center'>
                欢迎！{loggedInUser.username} <button onClick={logout} className='px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2'>登出</button>
            </div>

            <div className='flex justify-around'>
                <UserBlogs userId={loggedInUser.id} />
                <UserComments userId={loggedInUser.id} />
            </div>


        </Layout>
    )
}

export default ProfilePage;