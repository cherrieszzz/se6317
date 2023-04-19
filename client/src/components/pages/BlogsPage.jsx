import React, { useContext, useEffect, useState } from 'react';
import Layout from '../layouts/Layout'
import instance from '../../services/axiosInit';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContextProvider';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const {loggedInUser, logout} = useContext(AuthContext);

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
    },[])

    if(blogs.length == 0) {
        return (
            <Layout>
                loading....
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="blog_list_title">
                {loggedInUser && <Link to='/addblog'>添加新文章</Link>}
            </div>
            {
                blogs.map((blog) => (
                    <div key={blog._id} className='blogcard'>
                        <Link to={'/blogs/'+ blog._id}> {blog.title} </Link>
                        <div>{blog.publish_time}</div>
                    </div>
                ))
            }
        </Layout>
    )
}

export default BlogsPage;