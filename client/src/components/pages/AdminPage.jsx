import React, { Component, useContext, useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { AuthContext } from '../../contexts/authContextProvider';
import instance from '../../services/axiosInit';

const AdminPage = () => {
    const navigate = useNavigate();
    const { loggedInAdmin } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([])

    if (!loggedInAdmin) {
        return <Navigate replace to="/admin/login" />;
    }

    useEffect(() => {
        instance.get('/admin/comments').then((res) => {
            console.log(res.data);
            setComments(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        instance.get('/api/posts').then((res) => {
            console.log(res.data);
            setBlogs(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleDelete = (deleteId) => {
        instance.delete(`/admin/posts/${deleteId}`).then((res) => {
            console.log(res.data);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleDeleteComment = (deleteId) => {
        instance.delete(`/admin/comments/${deleteId}`).then((res) => {
            console.log(res.data);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='flex flex-col mx-auto max-w-screen-md'>
            <div className='border-2 p-3 rounded-lg my-5'>
                <h2>所有博客</h2>
                {blogs.map((blog) => {
                    return (
                        <div key={blog._id} className='border-2 p-1 my-2 flex justify-between'>
                            <div>
                                {blog.title}
                            </div>

                            <button onClick={e => handleDelete(blog._id)}>
                                <svg class='icon' aria-hidden="true"> <use xlinkHref="#icon-shanchu"></use> </svg>
                            </button>
                        </div>
                    )
                })}
            </div>
            <div className='border-2 rounded-lg p-3'>
                <h2>所有评论</h2>
                {
                    comments.map((comment) => {
                        return (
                            <div key={comment._id} className='flex justify-between border-2 p-1 my-2 rounded-md'>
                                <div>
                                    {comment.content} - {comment.author.username}
                                </div>

                                <button onClick={e => handleDeleteComment(comment._id)}>
                                    <svg class='icon' aria-hidden="true"> <use xlinkHref="#icon-shanchu"></use> </svg>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AdminPage;