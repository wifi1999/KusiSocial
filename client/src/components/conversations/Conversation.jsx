import { useEffect, useState } from 'react';
import './conversation.css'
import axios from 'axios';

export default function Conversation({conversation, currentUser}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
      const friendId = conversation.members.find(member => member !== currentUser._id );
      const getUsers = async() => {
        try{  
          const res = await axios.get('/user?userId=' + friendId);
          setUser(res.data);
        } catch(err){
          console.log(err);
        }
      }
    getUsers(); 
  }, [conversation, currentUser]);
  

  return (
    <div className='conversation'>
        <img src={user?.profilePicture ? PF + user.profilePicture : PF + "/person/noAvatar.png"} alt="" className="conversationImg" />
        <span className="conversationName">{user?.username}</span>
    </div>
  )
}
