import React, { Component, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../services/axiosInit';
import Layout from '../layouts/Layout';

const Comments = ({ blogId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        function getComments() {
            instance.get(`/api/posts/${blogId}/comments`)
                .then((response) => {
                    setComments(response.data);
                    console.log(response.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getComments();
    }, [])

    if (comments.length == 0) {
        return (
            <>无评论</>
        )
    }

    return (
        <>{
            comments.map((comment) => {
                return (
                    <>
                        {comment.content}
                        {comment.comment_time}
                    </>
                )
            })
        }</>
    )
}

const AddComment = ({ blogId }) => {
    const [comment, setComment] = useState()

    const handleComment = (e) => {
        e.preventDefault();
        instance.post('api/comments', {
            post_id:blogId,
            content:comment
        }).then((res) => {
            console.log(res.data);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }
    return (
        <>
            <form onSubmit={handleComment}>
                <textarea name="" id="" cols="30" rows="10" onChange={e => setComment(e.target.value)}></textarea>
                <button type="submit">提交</button>
            </form>
        </>
    )
}

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
            <p>评论：</p>
            <AddComment blogId={blog._id} />
            <Comments blogId={blog._id} />
        </Layout>
    )
}

export default BlogDetail;