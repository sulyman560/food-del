import React, { useContext, useEffect, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';


const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up")
  const {url,setToken} = useContext(StoreContext)
  const [data,setData] = useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandlar = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  const onLogin = async(event) =>{
    event.preventDefault()
    let newUrl = url;
    if (currState==="Login") {
      newUrl += "/api/user/login"
    }
    else{
      newUrl += "/api/user/register"
    }
    const response = await axios.post(newUrl,data)
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
    } else {
      alert(response.data.message)
    }
  }
  useEffect(()=>{
    console.log(data);
    
  },[data])
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currState === "Sign Up" ? "Sign Up" : "Login"}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-inputs">
          {currState === "Login"
            ? <></> 
            :<input type="text" name='name' onChange={onChangeHandlar} value={data.name} placeholder="User name" required />
          }
          <input type="email" name='email' onChange={onChangeHandlar} value={data.email} placeholder="E-mail" required />
          <input type="password" name='password' onChange={onChangeHandlar} value={data.password} placeholder="Password" required />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-condutions">
          <input type="checkbox" required />
          <p>By continuing, i agree to the turms of use & privacy policy</p>
        </div>
        {currState === "Login"
          ? <p>Craete an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>

    </div>
  )
}

export default LoginPopUp
