import React, { useContext, useEffect, useState } from 'react';
import Layout from '../layouts/Layout'
import instance from '../../services/axiosInit';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContextProvider';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const { loggedInUser, logout } = useContext(AuthContext);

    useEffect(() => {
        async function fetchData() {
            instance.get('/api/posts')
                .then(response => {
                    setBlogs(response.data);
                    console.log(blogs);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        fetchData();
    }, [])

    if (blogs.length == 0) {
        return (
            <Layout>
                loading....
            </Layout>
        )
    }

    return (
        <Layout>
            <div>
                <div>
                    {loggedInUser && <Link to='/addblog' className='btn px-5'>添加新文章+</Link>}
                </div>
                {
                    blogs.map((blog) => (
                        <div key={blog._id} className='flex justify-between my-5 shadow-md p-3'>
                            <Link to={'/blogs/' + blog._id}> {blog.title} </Link>
                            <div>{blog.publish_time}</div>
                        </div>
                    ))
                }
            </div>

        </Layout>
    )
}

export default BlogsPage;