import React, { Component, useContext, useEffect, useState } from 'react';
import { useNavigate , Navigate} from 'react-router-dom';
import Layout from '../layouts/Layout';
import { AuthContext } from '../../contexts/authContextProvider';
import instance from '../../services/axiosInit';

const AdminPage = () => {
    const navigate = useNavigate();
    const {isAdmin} = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([])
    console.log(isAdmin);

    if(isAdmin == false) {
        return  <Navigate replace to="/admin/login" />;
    }

    useEffect(() => {
        instance.get('/admin/comments').then((res) => {
            console.log(res.data);
            setComments(res.data);
        }).catch((err) => {
            console.log(err);
        })
    },[])

    useEffect(() => {
        instance.get('/api/posts').then((res) => {
            console.log(res.data);
            setBlogs(res.data)
        }).catch((err) => {
            console.log(err);
        })
    },[])

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
        <div>
            <h2>所有博客</h2>
            {blogs.map((blog) => {
                return (
                    <div key={blog._id}>
                        {blog.title}
                        <button onClick={e => handleDelete(blog._id)}>删除</button>
                    </div>
                )
            })}
            <h2>所有评论</h2>
            {
                comments.map((comment) => {
                    return (
                        <div key={comment._id}>
                            {comment.content} {comment.author.username}
                            <button onClick={e => handleDeleteComment(comment._id)}>删除</button> 
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AdminPage;