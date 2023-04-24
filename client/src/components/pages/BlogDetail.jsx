import React, { Component, useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import instance from '../../services/axiosInit';
import Layout from '../layouts/Layout';
import { AuthContext } from '../../contexts/authContextProvider';

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
                    <div className='p-3 my-3'>
                        {comment.author.username} : {comment.content}
                    </div>
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
            post_id: blogId,
            content: comment
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
                <textarea name="" id="" className='w-100' onChange={e => setComment(e.target.value)}></textarea>
                <button type="submit">提交</button>
            </form>
        </>
    )
}

const BlogDetail = () => {
    const { loggedInUser } = useContext(AuthContext);
    const { id: blogId } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        function getData() {
            instance.get(`/api/posts/${blogId}`)
                .then((response) => {
                    setBlog(response.data);
                    console.log(response.data);
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
            <h2 className='text-lg mb-9 italic'>{blog.title}</h2>
            <p className='flex justify-between mb-5'>
                <div>作者：{blog.authorId.username}</div>
                <div> 类型:{blog.tags}</div>
            </p>
            <p className='leading-loose'> {blog.content}</p>
            <div className='my-4 shadow-lg p-5'>
                <p>评论：</p>
                {loggedInUser ? <AddComment blogId={blog._id} /> : <Link to={'/login'}>你需要登录才能发表评论</Link>}

                <Comments blogId={blog._id} />
            </div>

        </Layout>
    )
}

export default BlogDetail;