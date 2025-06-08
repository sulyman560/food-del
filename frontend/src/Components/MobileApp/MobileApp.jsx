import React from 'react'
import './MobileApp.css'
import { assets } from '../../assets/assets'
const MobileApp = () => {
    return (
        <div className='mobile-app' id='downloadApp'>
            <div className="app-text">
                <p>For Better Experience Download</p>
                <p>Tomato App</p>
            </div>

            <div className="app-img">
                <img src={assets.play_store} alt="" />
                <img src={assets.app_store} alt="" />
            </div>
        </div>
    )
}

export default MobileApp
