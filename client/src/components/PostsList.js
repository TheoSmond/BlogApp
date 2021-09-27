import React, {useState,useEffect} from 'react';
import axios from 'axios'


const PostsList = () => {
    const [post,setPost] = useState([])

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get('/api/posts');

            setPost(req.data);

        }
        fetchData();


    },[])
    return (
        <ul>
            {post.map((article) => (
                <li>
                    <p>Titre :{article.title}</p>
                    <p>Description :{article.body}</p>
                </li>

            ))}
        </ul>
    )

}

export default PostsList




