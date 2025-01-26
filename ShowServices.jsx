import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateServices from './UpdateServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';

const ShowServices = () => {
  const [services, setServices] = useState(null);
  const [tables, setTables] = useState(null);
  const [service, setService] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMouseOver = (e) => {
    setServices(e);
    console.log(services);
  };

  const handleMouseLeaveTables = () => {
    setTables(null);
    setServices(null);
  };

  const handleMouseLeave = () => {
    setServices(null);
  };

  const handleTableOver = (e) => {
    e.preventDefault();
    setTables(e);
    setServices(e);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = () => {
    axios
      .get('http://127.0.0.1:8000/api/services/')
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => console.log(error));
  };

  const handleUpdate = (serviceID) => {
    setServiceId(serviceID); 
  };

  const handleDelete = async (serviceID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/services/${serviceID}/delete/`);
      if (response.status === 204) {
        setService((prevServices) => prevServices.filter(service => service.id !== serviceID));
        alert("GREAT, SERVICE DELETED WITH SUCCESS");
      }
    } catch (error) {
      console.error("Failed to delete this service", error);
      alert("There was an error deleting this service, please try again.");
    }
  };

  const handleServiceUpdated = () => {
    setServiceId(null);
    fetchServices();
  };

  const filteredServices = service.filter((s) =>
    s.nom_service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const printService = (service) => {
    const printContent = `
      <html>
        <head>
          <title>Service Details</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            td { font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>Service Details</h1>
          <table>
            <tr><th>Nom Service</th><td>${service.nom_service}</td></tr>
            <tr><th>Description</th><td>${service.description}</td></tr>
          </table>
        </body>
      </html>
    `;

    const newWindow = window.open('', '', 'height=600,width=800');
    newWindow.document.write(printContent);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className='page'>
      <div className="home-login">
        <div className="logo">
          <h1>vrmx_HR</h1>
        </div>
        <ul className="header">
          <li><a href="">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="services" onMouseOver={handleMouseOver}>Services</a></li>
          <li><a href="all_e">All_E</a></li>
          <li><a href="contact">Contact</a></li>
          <button className="button-86" role="button"><a href="Login" className='active'>Login</a></button>
        </ul>

        <div className="show">
          <div className="header-show">
            <h1>LIST-SERVICES</h1>
            <input 
              type="text" 
              placeholder='Search for Services...' 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>

          <table className="tableservices" id="contrats-list">
            <thead>
              <tr>
                <th>Nom_services</th>
                <th>Description</th>
                <th>Modify</th>
                <th>Delete</th>
                <th>Imprimer</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.nom_service}</td>
                  <td>{service.description}</td>
                  <td>
                    <button className='Mod' onClick={() => handleUpdate(service.id)}>
                      Modify
                    </button>
                  </td>
                  <td>
                    <button className='Del' onClick={() => handleDelete(service.id)}>
                      <a href="">Delete</a>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => printService(service)} className='impr'>
                      Imprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <UpdateServices 
          serviceID={serviceId} 
          onUpdateService={handleServiceUpdated} 
        />
      </div>

      {services && (
        <ul className='servicess' onMouseLeave={handleMouseLeave}>
          <li className='lil'><FontAwesomeIcon className='icon' icon={faUsers}/><a href="services/Tables" onMouseOver={handleTableOver}>Tables</a></li>
          <li className='lil'><FontAwesomeIcon className='icon' icon={faStar}/><a href="services/Favoris">Favoris</a></li>
          <li className='lil'><FontAwesomeIcon className='icon' icon={faPersonCircleCheck}/><a href="/services/all_evaluations">Gestion du personnel</a></li>
          <li className='lil'><FontAwesomeIcon className='icon' icon={faPeopleArrows}/><a href="/services/tables/all_conges">Gestion des congés</a></li>
          <li className='lil'><FontAwesomeIcon className='icon' icon={faMoneyCheckDollar}/><a href="services/Gestion des salaires">Gestion des salaires</a></li>
          <li className='lil'><a href="/services/Dashboards">Dashboard</a></li>
        </ul>
      )}

      {tables && (
        <ul className='tables' onMouseLeave={handleMouseLeaveTables}>
          <li><a href="/services/tables/all_employees">Employees</a></li>
          <li><a href="/services/tables/all_services">Services</a></li>
          <li><a href="/services/tables/all_contrats">Contrats</a></li>
          <li><a href="/services/tables/all_conges">Conges</a></li>
          <li><a href="/services/tables/all_salaires">Salaires</a></li>
          <li><a href="/services/tables/all_recrutements">Recrutements</a></li>
        </ul>
      )}

      <ul className="reseaux-soc-services">
        <li><a href="https://www.tiktok.com/@verox_x1"><FontAwesomeIcon icon={faTiktok} /></a></li>
        <li><a href="https://www.facebook.com/profile.php?id=61571482892345"><FontAwesomeIcon icon={faFacebook} /></a></li>
        <li><a href="https://www.instagram.com/vrmx_l"><FontAwesomeIcon icon={faInstagram} /></a></li>
        <li><a href="https://github.com/VRMX2"><FontAwesomeIcon icon={faGithub} /></a></li>
      </ul>
    </div>
  );
};

export default ShowServices;
