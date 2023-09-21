import { useState, useEffect } from 'react'
import axios from 'axios'

const Blog = () => {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    useEffect(() => {
        fetch('https://dummyjson.com/posts/30')
            .then(res => res.json())
            .then(data => {
                setPost(data)
                setLoading(false)

            })
    }, [])



    return (
        <div>
            {loading ? (

                <img src="images/rolling.gif" alt="" />

            ) : (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                </>
            )}




        </div>
    )
}

export default Blog
