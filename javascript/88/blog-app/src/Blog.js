import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Comments from './Comments';

export default function Blog() {

    let { blogId } = useParams();
    const [blog, setBlog] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${blogId}`);
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                const currentBlog = await response.json();
                setBlog(currentBlog);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    return (
        <div className="posts" >
            {blog.map(post => (
                <div className="blogInfo">
                    <h2>{post.title}</h2>
                    <h4>{post.body}</h4>
                    <div >
                        <Comments postId={post.id} ></Comments>
                    </div>
                </div>
            ))}
        </div>
    )
}