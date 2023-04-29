import React, { Component, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { AuthContext } from '../../contexts/authContextProvider';
import instance from '../../services/axiosInit';


export default function AddBlogPage() {
    const navigate = useNavigate();
    const { loggedInUser } = useContext(AuthContext);
    const [err, setErr] = useState(false);
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [tags, setTags] = useState(null);

    function handleAddBlog(e) {
        e.preventDefault();
        instance.post('/api/posts', {
            title: title,
            content: content,
            tags: tags
        }).then((res) => {
            console.log(res.data);
            navigate('/');
        }).catch(err => {
            console.log(err);
            setErr(true);
        })
    }

    if (!loggedInUser) {
        return <Layout>没有登录</Layout>
    }

    if (err) {
        return <Layout>出现了错误</Layout>
    }

    return (
        <Layout>
            <h2>撰写新文章</h2>
            <div className='border-2 rounded-lg'>
                <form action="" onSubmit={handleAddBlog} className='addblog_form'>
                    <div className='flex flex-col m-3'>
                        <label htmlFor="" className='w-1/4'>标题</label>
                        <input className='w-3/4 border-2 p-2 w-full' type="text" name="title" id="" onChange={e => setTitle(e.target.value)} />
                    </div>

                    <br />

                    <div className='flex flex-col m-3'>
                        <label htmlFor="">正文</label>
                        <textarea className='placeholder-red-300  border-2 p-2' onChange={e => setContent(e.target.value)} ></textarea>
                    </div>

                    <div className='flex flex-col m-3'>
                        <label htmlFor="">标签</label>
                        <input className=' border-2 p-2' type="text" name="" id="" onChange={e => setTags(e.target.value)} />
                    </div>

                    <button type="submit" className='btn m-3'>添加</button>
                </form>
            </div>

        </Layout>
    )
}