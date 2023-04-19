import React, { Component, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { AuthContext } from '../../contexts/authContextProvider';
import instance from '../../services/axiosInit';

export default function AddBlogPage() {
    const navigate = useNavigate();
    const {loggedInUser} = useContext(AuthContext);
    const {err, setErr} = useState(false);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [tags, setTags] = useState(null);
    const token = localStorage.getItem('authorization');

    function handleAddBlog(e) {
        e.preventDefault();
        console.log(token);
        instance.post('/api/posts', {
            title:title,
            content:content,
            tags:tags
        }, {
            header: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            navigate('/');
            
        }).catch(err => {
           console.log(err);
           setErr(true);
        })
    }

    if(!loggedInUser) {
        return <Layout>没有登录</Layout>
    }

    if(err) {
        return <Layout>出现了错误</Layout>
    }

    return (
        <Layout>
            <h2>撰写新文章</h2>
            <form action="" onSubmit={handleAddBlog} className='addblog_form'>
                <label htmlFor="">标题</label>
                <input type="text" name="title" id="" onChange={e => setTitle(e.target.value)}/>
                <br />
                <label htmlFor="">正文</label>
                <textarea  onChange={e => setContent(e.target.value)} ></textarea>
                <label htmlFor="">标签</label>
                <input type="text" name="" id="" onChange={e => setTags(e.target.value)} />
                <button type="submit">添加</button>
            </form>
        </Layout>
    )
}