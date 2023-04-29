import React, { Component, useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import instance from '../../services/axiosInit';
import Layout from '../layouts/Layout';
import { AuthContext } from '../../contexts/authContextProvider';
import ReactLoading from 'react-loading';

const Comments = ({ blogId }) => {
    const [comments, setComments] = useState([]);


    useEffect(() => {
        function getComments() {
            instance.get(`/api/posts/${blogId}/comments`)
                .then((response) => {
                    setComments(response.data);
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
                    <div className='my-3 border-2 rounded-lg'>
                        <div className='bg-white-100 bg-gray-100 p-3'>
                            {comment.author.username}
                        </div>
                        <div className='bg-white-200 p-3'>
                            {comment.content}
                        </div>
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
                <textarea name="" id="" className='w-100 w-full border-2 rounded-lg p-3' onChange={e => setComment(e.target.value)}></textarea>
                <button type="submit" className='btn border-2 p-1 rounded-lg bg-purple-600 text-white'>提交</button>
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
            <Layout>
                <div className='flex justify-center align-middle h-100'>
                    <ReactLoading type="spin" color="#000" height={50} width={50} />
                </div>

            </Layout>
        )
    }

    return (
        <Layout>
            <h2 className='text-3xl mb-9 italic'>{blog.title}</h2>
            <p className='flex justify-between mb-5'>
                <div>作者：{blog.authorId.username}</div>
                <div> 类型:{blog.tags}</div>
            </p>
            <p className='leading-loose border-2 p-3 rounded-lg'> {blog.content}</p>
            <div className='my-4 p-5'>
                <p className='text-2xl'>评论：</p>
                {loggedInUser ? <AddComment blogId={blog._id} /> : <Link to={'/login'}>你需要登录才能发表评论</Link>}

                <Comments blogId={blog._id} />
            </div>

        </Layout>
    )
}

export default BlogDetail;