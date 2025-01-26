import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTiktok , faFacebook, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';
function AddEmployee() {
  const [employeeData, setEmployeeData] = useState({
    id: "",
    id_employe: "",
    image_employee: "",
    nom_employe: "",
    prenom_employe: "",
    datn: "",
    adresse_employe: "",
    date_embauche: "",
    id_service: ""
  });
  const [services, setservices] = useState(null)
  const HandleMouseleaver = ()=>{
    setservices(null);
  }
    const HandleMouseOvers = (e)=>{
      setservices(e);
      console.log(services)
    }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8000/api/employees/', employeeData)
      .then((response) => {
        alert("success")
        console.log(response.data);
      })
      .catch((error) => {
        alert("Error");
        console.error(error);
      });
  };

  return (
    <div className='page'>
      <div className="home-singin">
        <div className="logo">
          <h1>vrmx_HR</h1>
        </div>
        <ul className="header">
          <li><a href="home">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="services"  onMouseOver={HandleMouseOvers}>Services</a></li>
          <li><a href="all_e">All Employees</a></li>
          <li><a href="contact">Contact</a></li>
          <button className="button-86" role="button">
            <a href="Login" className='active'>Login</a>
          </button>
        </ul>
        <form onSubmit={handleSubmit} className='form-add'>
          <h1>Hey, Add Employees</h1>
          <div className="inpts5">
            {Object.keys(employeeData).map((key) => (
              <div className="ll2" key={key}>
                <label htmlFor="">{key}</label><input
                  type={key.includes("date") ? "date" : "text"}
                  placeholder={key.replace("_", " ")}
                  name={key}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <button type='submit' className='btns5'>Submit</button>
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
  );
}

export default AddEmployee;



