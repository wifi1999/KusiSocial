import './rightbar.css';
import Online from '../online/Online';
import { Users } from '../../dummyData';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Rightbar({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user]);


  useEffect(() => {
    const getFriends = async() => {
      try{
        if(user?._id){
          const friendList = await axios.get(`/user/friend/${user._id}`);
          setFriends(friendList.data);
        }
      } catch(err){
        console.log(err);
      }
    }
    getFriends();
  }, [user]);

  const handleClick = async() => {
    try{
      if(followed){
        await axios.put(`/user/${user._id}/unfollow`, {
          userId: currentUser._id
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else{
        await axios.put(`/user/${user._id}/follow`, {
          userId: currentUser._id
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch(err){
      console.error(err);
    }
  }

  const HomeRightbar = () => {

    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}/gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText"><b>Angie Bernal</b> and <b>3 other friends</b> have birthday today</span>
        </div>

        <img src={`${PF}/ad.png`} alt="" className="rightbarAd" />

        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(user => (<Online key={user.id} user={user} />))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        { currentUser.username !== user.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed? "Unfollow" : "Follow"}
            {followed? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <div className="rightbarTitle">User Information</div>
        <div className="rightbarInfo">

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
          </div>

          <h4 className="rightbarTitle">User friends</h4>

       
            {friends.map((friend) => (
              <div className="rightbarFollowings" key={friend._id}>
                  <Link to={'/profile/' + friend.username} style={{ textDecoration: "none" }}>
                    <div className="rightbarFollowing">
                      <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "/person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
                      <span className="rightbarFollowingName">{friend.username}</span>
                    </div>
                  </Link>
              </div>
      
            ))}
      

        </div>
      </>
    )
  }

  return (
    <>
      <div className='rightbar'>
        <div className="rightbarWrapper">

          {user? <ProfileRightbar /> : <HomeRightbar />}
          
        </div>
      </div>
    </>
  )
}
