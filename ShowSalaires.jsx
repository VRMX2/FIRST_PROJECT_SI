import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import UpdateSalaires from './UpdateSalaires'
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';




const ShowSalaires = ()=>{
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
  const [salaire, setsalaire] = useState([]);
  const [salaireID, setsalaireID] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchSalaires();
  }, []);

  const fetchSalaires = () => {
    axios
      .get('http://127.0.0.1:8000/api/salaire/')
      .then((response) => {
        setsalaire(response.data);
      })
      .catch((error) => console.log(error));
  };


  const handleUpdate = (salaireID) => {
    setsalaireID(salaireID); 
  };

  const handleDelete = async (salaireID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/salaire/${salaireID}/`);
      if (response.status === 204) {
        setsalaire((prevSalaire) => prevSalaire.filter(salaire => salaire.id !== salaireID));
      }
    } catch (error) {
      console.error("Failed to delete this salaire", error);
      alert("There was an error deleting this salaire, please try again.");
    }
  };


  const handleSalaireUpdated = () => {
    setsalaireID(null);
    fetchSalaires();
  };

  const filtredSalaires = salaire.filter((s) =>
    s.type_salaire.toLowerCase().includes(searchQuery.toLowerCase()) 
  );


  const printContract = (salaire) => {
    const printContent = `
      <html>
        <head>
          <title>Salaires Details</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            td { font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>Salaire Details</h1>
          <table>
            <tr><th>type_salaire</th><td>${salaire.type_salaire}</td></tr>
            <tr><th>monthely_salary</th><td>${salaire.monthely_salary}</td></tr>
            <tr><th>daily_salary</th><td>${salaire.daily_salary}</td></tr>
            <tr><th>salary_date</th><td>${salaire.salary_date}</td></tr>
            <tr><th>Employe</th><td>${salaire.Employe}</td></tr>
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
          <li><a href="/">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="services"  onMouseOver={HandleMouseOvers}>Services</a></li>
          <li><a href="all_e">All_E</a></li>
          <li><a href="contact">Contact</a></li>
          <button className="button-86" role="button"><a href="Login" className='active'>Login</a></button>
        </ul>

        <div className="show">
          <div className="header-show">
            <h1>LIST-SALAIRES</h1>
            <input
              type="text"
              placeholder='Search for salaires...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="tabelContrats">
            <thead>
              <tr>
                <th>type_salaire</th>
                <th>monthely_salary</th>
                <th>daily_salary</th>
                <th>salary_date</th>
                <th>Employe</th>
                <th>Modify</th>
                <th>Delete</th>
                <th>Imprimer</th>
              </tr>
            </thead>
            <tbody>
              {filtredSalaires.map((salaire) => (
                <tr key={salaire.id}>
                  <td>{salaire.type_salaire}</td>
                  <td>{salaire.monthely_salary}</td>
                  <td>{salaire.daily_salary}</td>
                  <td>{salaire.salary_date}</td>
                  <td>{salaire.Employe}</td>
                  <td>
                    <button className='Mod' onClick={() => handleUpdate(salaire.id)}>
                      Modify
                    </button>
                  </td>
                  <td>
                    <button className='Del' onClick={() => handleDelete(salaire.id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    <button onClick={() => printContract(salaire)} className='impr'>
                      Imprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <UpdateSalaires 
          salaireID={salaireID} 
          onUpdateSalaire={handleSalaireUpdated} 
        />
      </div>

      <ul className="reseaux-soc-services">
       <li><a href="https://www.tiktok.com/@verox_x1?_t=ZM-8tEXbT1J7t0&_r=1"><FontAwesomeIcon icon={faTiktok} /></a></li>
                                                           <li><a href="https://www.facebook.com/profile.php?id=61571482892345&mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebook} /></a></li>
                                                           <li><a href="https://www.instagram.com/vrmx_l?igsh=djN2bXQ2bjAzb285"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                                           <li><a href="https://github.com/VRMX2"><FontAwesomeIcon icon={faGithub} /></a></li>
      </ul>
       {services && (
                <ul className='servicess'  onMouseLeave={HandleMouseleaver}>
                  <li className='lil'><FontAwesomeIcon className='icon' icon = {faUsers}/><a href="services/Tables" onMouseOver={HandleTableOver}>Tables</a></li>
                  <li className='lil'><FontAwesomeIcon className='icon' icon = {faStar}/><a href="services/Favoris">Favoris</a></li>
                  <li className='lil'><FontAwesomeIcon className='icon' icon = {faPersonCircleCheck}/><a href="/services/all_evaluations">Gestion du personnel</a></li>
                  <li className='lil'><FontAwesomeIcon className='icon' icon = {faPeopleArrows}/><a href="/services/tables/all_conges">Gestion des congés</a></li>
                  <li className='lil'><FontAwesomeIcon className='icon' icon = {faMoneyCheckDollar}/><a href="services/Gestion des salaires">Gestion des salaires</a></li>
                  <li className='lil'><a href="/services/Dashboerd">Dashboard</a></li>
                </ul>
              )}
              {tables && (
                <ul className='tables' onMouseLeave={HandleMouseleaverTables}>
                  <li><a href="/services/tables/all_employees">Employees</a></li>
                  <li><a href="/services/tables/all_services">Services</a></li>
                  <li><a href="/services/tables/all_contrats">Contart</a></li>
                  <li><a href="/services/tables/all_conges">Conges</a></li>
                  <li><a href="/services/tables/all_salaires">Salarys</a></li>
                  <li><a href="/services/tables/all_salaires">Recrutements</a></li>
                </ul>
              )}
    </div>
    
  );
}

export default ShowSalaires
