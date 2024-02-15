import './post.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { format } from 'timeago.js'; 
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({post}) {

  const [user, setUser] = useState({});
  const [like, setLike] = useState(post.like.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  const likeHandler = async () => {
    try{
      await axios.put("/post/" + post._id + "/like", { userId: currentUser._id });
    } catch(err){}

    setLike(isLiked? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  useEffect(() => {
    const fetchUsers = async() => {
      const res = await axios.get(`/user?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchUsers();
  }, [post.userId]);

  useEffect(() => {
    setIsLiked(post.like.includes(currentUser._id));
  }, [currentUser._id, post.like]);

  return (
    <div className='post'>
        <div className="postWrapper">

          <div className="postTop">

            <div className="postTopLeft">

              <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture ? PF + user.profilePicture :`${PF}/person/noAvatar.png`} alt="" className="postProfileImg" />
              </Link>

              <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>

            <div className="postTopRight"><MoreVertIcon /></div>

          </div>

          <div className="postCenter">
            <span className="postText">{post.desc}</span>
            <img src={post.img ? PF + post.img : ""} alt="" className="postImg" />
          </div>

          <div className="postBottom">
            <div className="postBottomLeft">
              <img src={`${PF}/like.png`} alt="" className="likeIcon" onClick={likeHandler}/>
              <img src={`${PF}/heart.png`} alt="" className="likeIcon" onClick={likeHandler}/>
              <span className="postLikeCounter">{like} people like it</span>
            </div>

            <div className="postBottomRight">
              <span className="postCommentText">{post.comment} comments</span>
            </div>
          </div>

        </div>
    </div>
  )
}
