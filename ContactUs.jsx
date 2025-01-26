import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTiktok , faFacebook, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';

function ContactUs() {
  return (
    <div>
    <div className='page'>
        <div className="home-login">
            <div className="logo">
              <h1>vrmx_HR</h1>
            </div>
            <ul className="header">
              <li><a href="/">Home</a></li>
              <li><a href="about">About Us</a></li>
              <li><a href="services">Services</a></li>
              <li><a href="all_e">All_E</a></li>
              <li><a href="contact">Contact</a></li>
              <button className="button-86" role="button"><a href="Login" className='active'>Login</a></button>
            </ul>
    <div className='about'>
        <h1 className='titleCon'>Contact</h1>
        <div className="box-contact">
            <div className="box-contact-left">
                <p>Visit Us, We Are In Baraki</p>
                <div className="box-image-contact">
                    <h1>Our team Look Forward To Welcoming You to Our VRMx</h1>
                    <div className="resea">
                        <li><a href=""><FontAwesomeIcon icon={faTiktok} /></a></li>
                        <li><a href=""><FontAwesomeIcon icon={faFacebook} /></a></li>
                        <li><a href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                        <li><a href=""><FontAwesomeIcon icon={faGithub} /></a></li>
                    </div>
                </div>
            </div>
            <div className="box-contact-right"></div>
        </div>
    </div>
    </div>
    </div>
    <div className="Contact-us">
        <div className="contact-include">
        <div className="contact-left">
            <h1>Contact Us</h1>
            <div className="inf">
            <p>Tel:0774525109</p>
            <a href="">lehcengrissi@gmail.com</a>
            <p> location:BarakiCity</p>
            </div>
            <div className="res">
                <li><a href=""><FontAwesomeIcon icon={faTiktok} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faFacebook} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                <li><a href=""><FontAwesomeIcon icon={faGithub} /></a></li>
            </div>
        </div>
        <div className="contact-right">
            <h1>THE ESSENTIELS LINKS</h1>
        <ul className="links-contact">
              <li><a href="">Home</a></li>
              <li><a href="about">About Us</a></li>
              <li><a href="services">Services</a></li>
              <li><a href="all_e">All_E</a></li>
              <li><a href="contact">Contact</a></li>
            </ul>
        </div>
        </div>
    </div>
    </div>
  )
}

export default ContactUs
