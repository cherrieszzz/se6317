import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../services/axiosInit';
import Layout from '../layouts/Layout';

const BlogDetail = () => {
    const { id: blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        function getData() {
            instance.get(`/api/posts/${blogId}`)
                .then((response) => {
                    setBlog(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getData();
    }, []);

    if (!blog) {
        return (
            <Layout>loading...</Layout>
        )
    }

    return (
        <Layout>
            <h2>{blog.title}</h2>
            <p>作者ID：{blog.authorId} 类型:{blog.tags}</p>
            <p> {blog.content}</p>
        </Layout>
    )
}

export default BlogDetail;