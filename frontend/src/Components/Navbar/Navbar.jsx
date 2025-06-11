import React, { useEffect, useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
const Navbar = ({setShowLogin}) => {
  const {getTotal,token,setToken,cartItem} = useContext(StoreContext)
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
    const [menu,setMenu] = useState("Home");

  return (
    <div className='navbar'>
      <a href="https://food-del-frontend1-5l6a.onrender.com">
      <img className='logo' src={assets.logo} alt="" />
      </a>
      
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu('Home')} className={menu==="Home"?"active":""}>Home</Link>
        <a href='#menu' onClick={()=>setMenu('Menu')} className={menu==="Menu"?"active":""}>Menu</a>
        <a href='#downloadApp' onClick={()=>setMenu('Mobile App')} className={menu==="Mobile App"?"active":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu('Contact Us')} className={menu==="Contact Us"?"active":""}>Contact Us</a>
      </ul>   
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/Cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotal()===0?"":"dot"}></div>
            
        </div>
        {!token?<button onClick={()=>setShowLogin(true)} className='signUp'>Sign Up</button>
        :<div className='navbar-Profile'>
          <img src={assets.profile_icon} alt="" />
          <ul className="nav-profile-dropdown">
            <Link to='/myorders'>
            <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
            </Link>
            <hr />
            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
          </ul>
        </div>
        }
        
      </div>
    </div>
  )
}

export default Navbar
