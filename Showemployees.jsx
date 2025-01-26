import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateEmployee from './UpdateEmployee';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faTiktok , faFacebook, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';

const ShowEmployees = () => {
  const [services, setservices] = useState(null)
  const [tables,settables] = useState(null)
  const [employees, setEmployees] = useState([]);
  const [employeeSelectedId, setEmployeeSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/employees/');
      setEmployees(response.data);
    } catch (error) {
      console.log('Error fetching employees:', error);
    }
  };

  const handleDelete = async (employeeID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/employees/${employeeID}/`);
      if (response.status === 204) {
        setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== employeeID));
        alert('Employee deleted successfully!');
      } else {
        console.log("there is an error")
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      // alert('ERROR DELETING EMPLOYEE');
    }
  };

  const handleUpdate = (employeeID) => {
    setEmployeeSelectedId(employeeID);
  };

  const handleEmployeeUpdated = () => {
    setEmployeeSelectedId(null);
    fetchEmployees();
  };

  const filterSearch = employees.filter((employee) =>
    employee.nom_employe.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.prenom_employe.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const printList = () => {
    const printContent = document.getElementById('contrats-list');
    const newWindow = window.open('', '', 'height=600,width=800');
    
    newWindow.document.write('<html><head><title>Liste des Contrats</title>');
    newWindow.document.write(`
      <style>
        @media print {
          body { font-family: Arial, sans-serif; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
          td { font-size: 12px; }
          .page, .header, .home-login, .logo, .button-86, .reseaux-soc-services { display: none; }
          .Mod, .Del, button { display: none; }
          .header-show { display: none; }
        }
      </style>
    `);
    newWindow.document.write('</head><body>');
    newWindow.document.write('<h1>Liste des employees</h1>');
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.write('</body></html>');
    newWindow.document.close();

    newWindow.print();
  };
  return (
    <div className="page-show">
      <div className="home-login">
        <div className="logo">
          <h1>vrmx_HR</h1>
        </div>
        <ul className="header">
          <li><a href="/">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="services" onMouseOver={HandleMouseOvers}>Services</a></li>
          <li><a href="all_e">All_e</a></li>
          <li><a href="contact">Contact</a></li>
          <button className="button-86" role="button"><a href="Login" className="active">Login</a></button>
        </ul>

        <div className="show">
          <div className="header-show">
            <h1>LIST EMPLOYEES</h1>
            <input
              type="text"
              placeholder="Search for Employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grand-box">
            {filterSearch.map((employee) => (
              <div className="box-employe" key={employee.id}>
                <div className="header-box-employee">
                  <img src={employee.image_employee} alt="" className="imags" />
                  <h1>
                    <Link to={`/services/tables/all_employees/${employee.id}`}>{employee.nom_employe} {employee.prenom_employe}</Link>
                  </h1>
                </div>
                <div className="informations-employees" id="contrats-list">
                  <h1>NOM: <span>{employee.nom_employe}</span></h1>
                  <h1>PRENOM: <span>{employee.prenom_employe}</span></h1>
                  <h1>DATE NAISSANCE: <span>{employee.date_naissance}</span></h1>
                  <h1>SEXE: <span>{employee.sexe}</span></h1>
                  <h1>EMAIL: <span>{employee.email}</span></h1>
                  <h1>ADRESSE: <span>{employee.adresse_employe}</span></h1>
                  <h1>DATE EMBAUCHE: <span>{employee.date_embauche}</span></h1>
                  <h1>ANCIENNETE: <span>{employee.anciennite}</span></h1>
                  <h1>DATE RECRUTEMENT: <span>{employee.date_recrutement}</span></h1>
                  <h1>TRAININGS: <span>{employee.training}</span></h1>
                  <h1>SKILLS: <span>{employee.skills}</span></h1>
                  <h1>SERVICE: <span>{employee.Service}</span></h1>
                </div>

                <div className="btns6">
                  <button className="Mod" onClick={() => handleUpdate(employee.id)}>
                    Modify
                  </button>
                  <button className="impr" onClick={() => printList(employee.id)}>
                    Imprimer
                  </button>
                  <button className="Del" onClick={() => handleDelete(employee.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            <ul className="reseaux-soc-show-employees">
                      <li><a href="https://www.tiktok.com/@verox_x1?_t=ZM-8tEXbT1J7t0&_r=1"><FontAwesomeIcon icon={faTiktok} /></a></li>
                                                    <li><a href="https://www.facebook.com/profile.php?id=61571482892345&mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebook} /></a></li>
                                                    <li><a href="https://www.instagram.com/vrmx_l?igsh=djN2bXQ2bjAzb285"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                                    <li><a href="https://github.com/VRMX2"><FontAwesomeIcon icon={faGithub} /></a></li>
                    </ul>
          </div>
        </div>

        <UpdateEmployee employeeID={employeeSelectedId} onEmployeeUpdated={handleEmployeeUpdated} />
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
                  <li><a href="/services/tables/all_salaires">Salarys</a></li>
                  <li><a href="/services/tables/all_salaires">Recrutements</a></li>
                  </ul>
                )}
                
      </div>
      
    </div>
  );
};

export default ShowEmployees;