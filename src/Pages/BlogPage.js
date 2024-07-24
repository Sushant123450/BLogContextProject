import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import { wait } from '@testing-library/user-event/dist/utils';
import { useEffect } from 'react';
import Header from '../Components/Header';
import BlogDetails from '../Components/BlogDetails';
import Spinner from '../Components/Spinner';

const BlogPage = () => {

    const navigation = useNavigate();
    const [blog, setBlog] = useState([]);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const { loading, setLoading } = useContext(AppContext)

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${baseUrl}?blogId=${blogId}`;
        // console.log(url);
        try {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data);
            // console.log();
            // console.log(data.relatedBlog);
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlog);
        } catch (err) {
            console.log(err);
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (blogId) {
            fetchRelatedBlogs();
        }

    }, [location.pathname]);

    return (
        <div>
            <Header />
            <div>
                <button onClick={() => navigation(-1)}>Back</button>
            </div>
            {loading ?
                (<Spinner />) :
                (blog ? (
                    <div>
                        <BlogDetails post={blog} />
                        <h2>Related Blogs</h2>
                        {
                            relatedBlogs.map((post) => (
                                <div key={post.id}>
                                    <BlogDetails post={post} />
                                </div>
                            ))
                        }
                    </div>
                )
                    :
                    (<p>No Blog Found</p>)
                )}
        </div>
    );
};

export default BlogPage;