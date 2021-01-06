import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                const currentBlogs = await response.json();
                setBlogs(currentBlogs);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);


    return (
        <div className="allUsers" >
            {blogs.map(blog => (
                <div className="blogInfo" key={blog.id}>
                    <h2>{blog.name}</h2>
                    <a className="blogSite">{blog.website}</a>
                    <div className="businessDiv">
                        <h3 className="blogbusiness">{blog.company.name}</h3>
                        <h4 className="description">{blog.company.catchPhrase}</h4>
                    </div>
                    <div >
                        <Link to={`/blog/${blog.id}`}>
                            <button id="postLink">Posts</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

