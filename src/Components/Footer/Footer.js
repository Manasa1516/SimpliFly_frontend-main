import React from 'react'
import insta from '../../Assets/Images/insta.png'
import facebook from '../../Assets/Images/logo-sn-facebook.svg'
import twitter from '../../Assets/Images/twitter.png'
import youtube from '../../Assets/Images/youtube.png'
import './Footer.css'

export default function Footer() {
  return (
    <div>
      <div className='footer'>
        <div className='footer-txt'>
            Simplifly
        </div>
        <div className='logos'>
            <img src={insta} className="social-media"/>
            <img src={facebook} className="social-media"/>
            <img src={twitter} className="social-media"/>
            <img src={youtube} className="social-media"/>
        </div>
      </div>
    </div>
  )
}
