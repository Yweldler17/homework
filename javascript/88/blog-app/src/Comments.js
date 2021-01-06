import React, { useState, useEffect } from 'react'

export default function Comments(props) {
    const [commentsShowing, setcommentsShowing] = useState(false);
    const currentPost = props.postId;
    const [comments, setComments] = useState([]);

    useEffect(() => {

        (async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${currentPost}`);
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                const currentComments = await response.json();
                setComments(currentComments);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);

    const text = commentsShowing ? 'Hide' : 'Show';

    const toggleComments = () => {
        setcommentsShowing(!commentsShowing);
    }

    const getCommentElem = (postId) => {
        if (commentsShowing) {
            return <div className="commentDiv" postId={postId} >
                {comments.map(c => (
                    <div className="comments">
                        <h3>{c.name}</h3>
                        <p>{c.body}</p>
                        <br />
                    </div>
                ))}
            </div>
        }
        return null;
    }

    return (
        <div >
            <button onClick={toggleComments}>{text} Comments</button>
            {getCommentElem(currentPost)}
        </div>
    )
}