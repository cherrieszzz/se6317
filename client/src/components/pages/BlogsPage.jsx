import React, { useContext, useEffect, useState } from 'react';
import Layout from '../layouts/Layout'
import instance from '../../services/axiosInit';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContextProvider';
import ReactLoading from 'react-loading';

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
                  <ReactLoading type="spin" color="#000" height={50} width={50} />
            </Layout>
        )
    }

    return (
        <Layout>
            <div>
                <div>
                    {loggedInUser && <Link to='/addblog' className='btn px-5'>
                    <svg class='icon' aria-hidden="true"> <use xlinkHref="#icon-jiahao"></use> </svg>   
                    </Link>}
                </div>
                {
                    blogs.map((blog) => (
                        <div key={blog._id} className='flex justify-between my-3 shadow-md p-3 border-2 rounded-lg'>
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