import './topbar.css'
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { logoutCall } from '../../apiCall';

export default function Topbar() {

  const { user, dispatch } = useContext(AuthContext); 
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleClick = () => {
    logoutCall(dispatch);
  }

  return (
    <div className="topbarContainer">

      <div className="topbarLeft">
        <Link to='/' style={{ textDecoration:'none' }}>
          <span className='logo'>Kusiday</span>
        </Link>   
      </div>

      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className='searchIcon'/>
          <input type="text" placeholder='Search for friend, post, or video' className='searchInput'/>
        </div>
      </div>

      <div className="topbarRight">

        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>

        <div className="topbarIcons">

          <div className="topbarIcon">
            <PersonIcon />
            <span className='topbarIconBadge'>1</span>
          </div>
          <div className="topbarIcon">
            <ChatIcon />
            <span className='topbarIconBadge'>1</span>
          </div>
          <div className="topbarIcon">
            <NotificationsIcon />
            <span className='topbarIconBadge'>1</span>
          </div>

        </div>

        <Link to={`/profile/${user.username}`}>
          <img src={user.profilePicture ? PF + user.profilePicture : PF + "/person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>

        <span className="topbarLink" onClick={handleClick}>Sign out</span>
       
      </div>

    </div>

  )
}


