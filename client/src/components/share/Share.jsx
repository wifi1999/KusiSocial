import './share.css';
import MovieIcon from '@mui/icons-material/Movie';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value
    }

    if(file){
      const data = new FormData();
      const fileName = "/" + Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);

      try{
        await axios.post("/upload", data);
      } catch(err){}
    }

    try{
      await axios.post('/post', newPost);
      window.location.reload();
    } catch(err){}
  }

  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={user.profilePicture ? PF + user.profilePicture : PF + "/person/noAvatar.png"} alt="" className="shareProfileImg" />
          <input type="text" className='shareInput' placeholder={"What is in your mind " + user.username + "?"} ref={ desc }/>
        </div>

        <hr className='shareHr'/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <CloseIcon className='shareCancelImg' onClick={() => setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">

            <label htmlFor="file" className="shareOption">
              <MovieIcon htmlColor='tomato'/>
              <span className='shareOptionText'>Photo/Video</span>
              <input style={{ display: "none" }} type="file" id="file" accept='.jpg, .jpeg, .png' onChange={ e => setFile(e.target.files[0]) }/>
            </label>

            <div className="shareOption">
              <LabelIcon htmlColor='blue'/>
              <span className='shareOptionText'>Tag</span>
            </div>

            <div className="shareOption">
              <LocationOnIcon htmlColor='green'/>
              <span className='shareOptionText'>Location</span>
            </div>

            <div className="shareOption">
              <EmojiEmotionsIcon htmlColor='goldenrod'/>
              <span className='shareOptionText'>Feelings</span>
            </div>

            <button className='shareButton' type="submit" >Share</button>

          </div>
        </form>

      </div>
    </div>
  )
}
