import React, { useContext, useState } from 'react'
import amazon from "../../assets/Amazon_logo.svg.png"
import authCss from "../Auth/Auth.module.css"
import {auth} from "../../Utility/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect } from 'firebase/auth'
import {DataContext} from "../../Components/DataProvider/DataProvider"
import { Type } from '../../Utility/action.type'
import { Link,useNavigate} from "react-router-dom"

import { ClipLoader } from "react-spinners";



function Auth() {

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
  const [user, dispatch] = useContext(DataContext);
  const navigate = useNavigate()

  const [loading,setLoading]=useState({
    signIn:false,
    signUp:false,
  })

const authHandler= async(e)=>{
  e.preventDefault();
  // console.log(e.target.name);
  if (e.target.name == "signin"){
    setLoading({...loading,signIn:true})
    signInWithEmailAndPassword(auth,email,password)
    .then((userInfo)=>{
     dispatch({
      type:Type.SET_USER,
      user:userInfo.user
     });
     setLoading({...loading, signIn:false});
     navigate("/")
    })
    .catch((err)=>{
      setError(err.message);  
     setLoading({ ...loading, signIn: false });
    })

  } else {
    setLoading({...loading, signUp:true})
    createUserWithEmailAndPassword(auth,email,password)
    .then((userInfo)=>{
      // console.log(userInfo);
      dispatch({
        type:Type.SET_USER,
        user:userInfo.user
      })
      setLoading({ ...loading, signUp: false });
      navigate("/")
      
    })
    .catch((err)=>{
     setError(err.message);
     setLoading({ ...loading, signUp: false });
      
    });
  }  
}

  return (
    <div className={authCss.logo_holder}>
      <Link to="/">
        <img src={amazon} alt="amazon logo" />
      </Link>
      <div className={authCss.login_container}>
        <h1>Sign-In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
          />
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={authCss.login_signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="black"></ClipLoader>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p>
          By signing in you agree to the AMAZON FAKE CLONE Condtion of Use
          &Sales.Please see our <a href="">Privacy Notice</a>, our Cookies
          Notice and our Interest.Based Ads Notice
        </p>
        <h5>New to Amazon?</h5>
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={authCss.login_registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="black"></ClipLoader>
          ) : (
            "Create your Amazon account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </div>
  );
}

export default Auth
