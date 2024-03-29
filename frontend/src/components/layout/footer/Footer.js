import React from 'react'
import playStore from '../../../images/google.png'
import appStore from '../../../images/apple.png'
import './footer.css'

function Footer() {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>Download our AP4</h4>
            <p>Download App for Android and IOS mobile phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="appstore" />
        </div>

        <div className="midFooter">
            <h1>IndiaKart</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2021 &copy; IndiaKart</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://twitter.com/">Twitter</a>
            <a href="https://www.facebook.com/">Facebook</a>
        </div>
    </footer>
  )
}

export default Footer