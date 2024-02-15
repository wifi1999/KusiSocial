import { useEffect, useState } from 'react';
import './chatOnline.css';
import axios from 'axios';

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async() => {
        try{
            const res = await axios.get('/user/friend/' + currentId);
            setFriends(res.data);
        } catch(err){
            console.log(err)
        }
    }
    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend._id)));
  }, [friends, onlineUsers]);

  const handleClick = async(user) => {
    try{
        const res = await axios.get(`/conversation/find/${currentId}/${user._id}`);
        setCurrentChat(res.data);
    } catch(err){
        console.log(err);
    }
  }

  return (
    <div className='chatOnline'>
        {onlineFriends.map(onlineFriend => (
            <div className="chatOnlineFriend" key={onlineFriend._id} onClick={() => handleClick(onlineFriend)}>
                <div className="chatOnlineImgContainer">
                    <img src={onlineFriend?.profilePicture ? PF + onlineFriend.profilePicture : PF + '/person/noAvatar.png'} alt="" className='chatOnlineImg'/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{onlineFriend.username}</span >
            </div>
        ))}  
    </div>
  )
}
