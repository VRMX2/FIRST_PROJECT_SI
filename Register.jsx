import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTiktok , faFacebook, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';
const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);
    const [services, setservices] = useState(null)
    const HandleMouseOvers = (e)=>{
        setservices(e);
        console.log(services)
      }
      const HandleMouseleaver = ()=>{
        setservices(null);
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', { 
                email,
                username,
                password,
                password2,
            });
            console.log(response.data);
            window.location.href = '/login'; 
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div className='page'>
        <div className="home-register">
        <div className="logo">
          <h1>vrmx_HR</h1>
        </div>
        <ul className="header">
          <li><a href="" >Home</a></li>
          <li><a href="about" >About Us</a></li>
          <li><a href="services" onMouseOver={HandleMouseOvers}>Services</a></li>
          <li><a href="all_e">All_E</a></li>
          <li><a href="contact">Contact</a></li>
          <button className="button-86" role="button" ><a href="Login" className='active' >Login</a></button>
        </ul>
        <div className='Register'>
        <h1 className='logo-register'><a href="">vrmx_HR</a></h1>
            <div className="register-left">
                <div className="register-include">
                    <div className="register-include-image"></div>
                </div>
                <ul className="reseaux-register">
                  <li><a href=""><FontAwesomeIcon icon={faTiktok} /></a></li>
                  <li><a href=""><FontAwesomeIcon icon={faFacebook} /></a></li>
                  <li><a href=""><FontAwesomeIcon icon={faInstagram} /></a></li>
                  <li><a href=""><FontAwesomeIcon icon={faGithub} /></a></li>
                </ul>
            </div>
            <form onSubmit={handleSubmit} className='register-right'>
            <h1>Create your account</h1>
            <div className="input-rigister">
            <input type="text"     name='username'  placeholder='Username'              value={username}  onChange={(e)=>{setUsername  (e.target.value)}} />
            <input type="email"    name='email'     placeholder='Email'                 value={email}  onChange={(e)=>{setEmail     (e.target.value)}} />
            <input type="password" name='password'  placeholder='Password'              value={password}  onChange={(e)=>{setPassword  (e.target.value)}} />
            <input type="password" name='password2' placeholder='Password Confirmation' value={password2}  onChange={(e)=>{setPassword2 (e.target.value)}} />
            {error && <div className="error">{error.message}</div>}
            </div>
            <div className="bt1">
                <button type="submit">Register</button>
                <p>Already have an account?  <a href=""> Sign In</a></p>
            </div>
           </form>
        </div>
        {services && (
                      <ul className='servicess'  onMouseLeave={HandleMouseleaver}>
                        <li className='lil'><FontAwesomeIcon className='icon' icon = {faUsers}/><a href="services/Tables">Tables</a></li>
                        <li className='lil'><FontAwesomeIcon className='icon' icon = {faStar}/><a href="services/Favoris">Favoris</a></li>
                        <li className='lil'><FontAwesomeIcon className='icon' icon = {faPersonCircleCheck}/><a href="services/Gestion du personnel">Gestion du personnel</a></li>
                        <li className='lil'><FontAwesomeIcon className='icon' icon = {faPeopleArrows}/><a href="services/Gestion des conges">Gestion des congés</a></li>
                        <li className='lil'><FontAwesomeIcon className='icon' icon = {faMoneyCheckDollar}/><a href="services/Gestion des salaires">Gestion des salaires</a></li>
                      </ul>
                    )}
        </div>
        </div>
        
    );
};

export default Register;