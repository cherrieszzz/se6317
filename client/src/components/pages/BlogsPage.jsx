import React, { useEffect, useState } from 'react';
import Layout from '../layouts/Layout'
import instance from '../../services/axiosInit';
import { Link } from 'react-router-dom';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);

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
            {
                blogs.map((blog) => (
                    <div key={blog._id}>
                        <Link to={'/blogs/'+ blog._id}> {blog.title} </Link>
                    </div>
                ))
            }
        </Layout>
    )
}

export default BlogsPage;