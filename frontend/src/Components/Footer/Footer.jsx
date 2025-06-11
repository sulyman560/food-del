import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="footer" id='footer'>

      <div className='footer-content'>
        <div className="footer-left">
          <img src={assets.logo} alt="" />
          <p>Bangladesh’s leading food delivery app with over 5000+ restaurants along with amazing deals</p>
          <div className='social-icons'>
            <a href="https://www.facebook.com/sulyman.ahammad/"><img src={assets.facebook_icon} alt="" /></a>
            <a href="https://www.facebook.com/sulyman.ahammad/"><img src={assets.twitter_icon} alt="" /></a>
            <a href="https://www.facebook.com/sulyman.ahammad/"><img src={assets.linkedin_icon} alt="" /></a>
          </div>
        </div>
        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul className="menu-list">
            <Link to='/'>Home</Link>
            <a href='#about us'>About Us</a>
            <a href='#delivary'>Delivary</a>
            <a href='#privacy'>Privacy Policy</a>
          </ul>
        </div>
        <div className="footer-right">
          <h2>GET IN TOUCH</h2>
          <p>01967-106291</p>
          <p>sulyman560@gmail.com</p>
        </div>
      </div>
      <br />
      <hr />
      <div className="copyright">
        <p>Copyright 2025 @ sulyman560@gmail.com - All Right Reserved.</p>
      </div>
    </div>

  )
}

export default Footer
