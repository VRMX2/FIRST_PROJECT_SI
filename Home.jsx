import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTiktok , faFacebook, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';
import { useState } from 'react';
function Home() {
  const [services, setservices] = useState(null)
  const [tables,settables] = useState(null)
  const HandleSubmit = (event)=>{
    event.preventDefault();
  }
  const HandleMouseOvers = (e)=>{
    setservices(e);
    console.log(services)
  }
  const HandleMouseleaverTables = ()=>{
    settables(null)
    setservices(null)
  }
  const HandleMouseleaver = ()=>{
    setservices(null);
  }
  
  const HandleTableOver = (e)=>{
    e.preventDefault();
    settables(e);
    setservices(e);
  }
  return (
    <div>
    <div className='home'>
      <div className="logo">
        <h1>vrmx_HR</h1>
      </div>
      <ul className="header">
        <li><a href="" onSubmit={HandleSubmit}>Home</a></li>
        <li><a href="about" onSubmit={HandleSubmit}>About Us</a></li>
        <li><a href="services" onMouseOver={HandleMouseOvers} >Services</a></li>
        <li><a href="all_e" onSubmit={HandleSubmit}>All_E</a></li>
        <li><a href="contact" onSubmit={HandleSubmit}>Contact</a></li>
        <button className="button-86" role="button" ><a href="Login" className='active' onSubmit={HandleSubmit}>Login</a></button>
      </ul>
      <div className="home-left">
        <div className="home-left-top">
          <div className="home-left-top-top">
            <div className="image-logo">
              <img src="./images" alt="" />
            </div>
            <div className="ligne">_________________________</div>
            <div className="images-logo-employees">
              <div className="crecle-employes1"></div>
              <div className="crecle-employes2"></div>
              <div className="crecle-employes3"></div>
            </div>
          </div>
          <div className="home-left-top-bottom"></div>
        </div>
        <div className="home-left-bottom">
          <div className="paragraphe-rh">
          <h1>HUMAIN <br />
              RESSOURCES
           </h1>
            <p>Human Resources (HR) is the department responsible for managing an organization's workforce. Key functions include recruitment, training, employee relations, compensation & benefits, and ensuring legal compliance.</p>
          </div>
          <div className="crcl1">
            <div className="crcl2">
              <h1>20%</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="home-right">
      <div className="prgph">
        <h1>HUMAN RESSOURCES ROLES</h1>
        <p>Human Resources (HR) plays a vital role in supporting employees throughout their employment journey. HR departments assist with recruitment and hiring, provide training and development opportunities, administer employee benefits, and ensure fair treatment and compliance with labor laws. By fostering a positive and supportive work environment, HR helps employees feel valued and motivated, contributing to increased job satisfaction and overall organizational success.</p>
      </div>
      <div className="back-img-home-right"></div>
      <div className="poten-count">
        <div className="potentiel">
          <h1>POTENTIEL</h1>
          <div className="classes_1">
            <div className="bb">
              <div className="one"></div>
            </div>
            <div className="bb">
              <div className="two"></div>
            </div>
            <div className="bb">
              <div className="three"></div>
            </div>
            <div className="bb">
              <div className="four"></div>
            </div>
          </div>
        </div>
        <div className="count-employyees">
          <div className="employees-phtos">
            <div className="emp1"></div>
            <div className="emp2"></div>
            <div className="emp3"></div>
          </div>
          <div className="degree">
            <div className="degree-include"></div>
          </div>
          <h1 className='count'>+100</h1>
        </div>
      </div>
      </div>
      <div className="home-middle">
        <div className="home-middle-center"></div>
      </div>
      <ul className="reseaux-soc">
         <li><a href="https://www.tiktok.com/@verox_x1?_t=ZM-8tEXbT1J7t0&_r=1"><FontAwesomeIcon icon={faTiktok} /></a></li>
                               <li><a href="https://www.facebook.com/profile.php?id=61571482892345&mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebook} /></a></li>
                               <li><a href="https://www.instagram.com/vrmx_l?igsh=djN2bXQ2bjAzb285"><FontAwesomeIcon icon={faInstagram} /></a></li>
                               <li><a href="https://www.tiktok.com/@verox_x1?_t=ZM-8tEXbT1J7t0&_r=1"><FontAwesomeIcon icon={faGithub} /></a></li>
        </ul>

        {services && (
          <ul className='servicess'  onMouseLeave={HandleMouseleaver}>
            <li className='lil'><FontAwesomeIcon className='icon' icon = {faUsers}/><a href="services/Tables" onMouseOver={HandleTableOver}>Tables</a></li>
            <li className='lil'><FontAwesomeIcon className='icon' icon = {faStar}/><a href="services/Favoris">Favoris</a></li>
            <li className='lil'><FontAwesomeIcon className='icon' icon = {faPersonCircleCheck}/><a href="/services/all_evaluations">Gestion du personnel</a></li>
            <li className='lil'><FontAwesomeIcon className='icon' icon = {faPeopleArrows}/><a href="/services/tables/all_conges">Gestion des congés</a></li>
            <li className='lil'><FontAwesomeIcon className='icon' icon = {faMoneyCheckDollar}/><a href="services/Gestion des salaires">Gestion des salaires</a></li>
            <li className='lil'><a href="/services/Dashboeards">Dashboard</a></li>
          </ul>
        )}
        {tables && (
          <ul className='tables' onMouseLeave={HandleMouseleaverTables}>
            <li><a href="/services/tables/all_employees">Employees</a></li>
            <li><a href="/services/tables/all_services">Services</a></li>
            <li><a href="/services/tables/all_contrats">Contart</a></li>
            <li><a href="/services/tables/all_conges">Conges</a></li>
            <li><a href="/services/tables/all_salaires">Recrutements</a></li>
          </ul>
        )}
    </div>
    
    </div>
    
  )
}
export default Home

