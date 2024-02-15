import './login.css';
import { useContext, useRef } from 'react';
import { loginCall } from '../../apiCall';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);


  const handleClick = async(e) => {
    e.preventDefault();
    await loginCall({ email: email.current.value, password: password.current.value }, dispatch); 
  }

  console.log(user);

  return (
    <div className="login">
      <div className="loginWrapper">


        <div className="loginLeft">
          <h3 className="loginLogo">Kusiday</h3>
          <span className="loginDesc">Connect with friends and the world around you on Kusiday</span>
        </div>

        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>

            <input type="email" className="loginInput" placeholder='Email' ref={email} required/>
            <input type="password" className="loginInput" placeholder='Password' ref={password} required minLength={6} />

            <button className="loginButton" type='submit' disabled={isFetching}>
              {isFetching ? <CircularProgress style={{ color: 'white', size: '20px' }} /> : "Log in"}
            </button>

            <span className="loginForgot">Forgot Password?</span>

            <Link to="/register">
              <button className="loginRegisterButton">
                {isFetching ? <CircularProgress style={{ color: 'white', size: '20px' }} /> : "Create a New Account?"}
              </button>
            </Link>
           
          </form>
        </div>
      </div>
      
    </div>
  )
}
