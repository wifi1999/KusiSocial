import { useRef } from 'react';
import './register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleClick = async(e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Password don't match");
    } else{
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value
        }
      try{
        await axios.post("/auth/register", user);
        navigate('/login');
      } catch(err){
        console.log(err);
      }
    }
  }

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">

          <h3 className="registerLogo">Kusiday</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Zhilisocial.
          </span>

        </div>

        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input type="text" className="registerInput" placeholder='Username' ref={username} required/>
            <input type="email" className="registerInput" placeholder='Email' ref={email} required />
            <input type="password" className="registerInput" placeholder='Password' ref={password} required minLength={6}/>
            <input type="password" className="registerInput" placeholder='Password Again' ref={passwordAgain} required />
            <button className="registerButton" type="submit">Sign Up</button>
            <Link to="/login">  
              <button className="loginRegisterButton" type="submit">Log Into Account</button>
            </Link> 
          </form>
        </div>
        
      </div>
    </div>
  )
}
