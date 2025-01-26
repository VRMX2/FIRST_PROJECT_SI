import React from 'react'

function About() {
  return (
    <div className='page'>
        <div className="home-login">
            <div className="logo">
              <h1>vrmx_HR</h1>
            </div>
            <ul className="header">
              <li><a href="">Home</a></li>
              <li><a href="about">About Us</a></li>
              <li><a href="services">Services</a></li>
              <li><a href="all_e">All_E</a></li>
              <li><a href="contact">Contact</a></li>
              <button className="button-86" role="button"><a href="Login" className='active'>Login</a></button>
            </ul>
    <div className='about'>
        <h1>about</h1>
        <div className="the-paragrapges-of-about">
            <div className="parg">
            <h2>Do You Want Know our Story?</h2>
            <p>At VRMX_HR, we are dedicated to transforming the way businesses manage and nurture their greatest asset: their people.With a focus on innovation, efficiency, and a deep understanding of human resources, we provide tailored solutions that drive growth and foster positive work environments. </p>
            <div className="box-image-about"></div>
            </div>
            <p className='pp'>Our team of experts is committed to supporting organizations in optimizing their workforce through data-driven insights, employee well-being programs, and streamlined HR processes. Whether you're a small startup or a large enterprise, we are here to empower you to build a more productive, engaged, and diverse workplace. At the heart of everything we do is a passion for fostering meaningful connections between employers and employees, creating success stories that benefit both individuals and businesses alike.</p>
        </div>
    </div>
    </div>
    </div>
  )
}

export default About
