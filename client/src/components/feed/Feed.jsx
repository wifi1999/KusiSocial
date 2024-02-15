import './feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async() => {
      const res = username
        ? await axios.get("/post/profile/" + username) // profile page
        : await axios.get("/post/timeline/" + user._id); // home page
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    } 
    fetchPosts();
  }, [username, user._id]);
 
  return (
    <div className='feed'>
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map(post => (<Post key={post._id} post={post} />))}
      </div>
    </div>
  )
}
