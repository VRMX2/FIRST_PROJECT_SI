import React from 'react'
import { useEffect , useState } from 'react';
import axios from 'axios';
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import UpdateRecrs from './UpdateRecrs';

const ShowRecres =()=> {
  const [services, setservices] = useState(null)
  const [tables,settables] = useState(null)
  const [recr, setrecr] = useState([]);
  const [recrID, setrecrID] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");

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
    fetchSalaires();
  }, []);

  const fetchSalaires = () => {
    axios
      .get('http://127.0.0.1:8000/api/recs/')
      .then((response) => {
        setrecr(response.data);
      })
      .catch((error) => console.log(error));
  };


  const handleUpdate = (recrID) => {
    setrecrID(recrID); 
  };

  const handleDelete = async (salaireID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/recs/${recrID}/`);
      if (response.status === 204) {
        setrecrID((prevRec) => prevRec.filter(recr => recr.id !== recrID));
      }
    } catch (error) {
      console.error("Failed to delete this salaire", error);
      alert("There was an error deleting this salaire, please try again.");
    }
  };


  const handleRecruitmenetUpdated = () => {
    setrecrID(null);
    fetchSalaires();
  };

  const filtredRecruitement = recr.filter((s) =>
    s.job_position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.applicant_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='page'>
      <div className="home-login">
        <div className="logo">
          <h1>vrmx_HR</h1>
        </div>
        <ul className="header">
          <li><a href="">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="services" onMouseOver={HandleMouseOvers}>Services</a></li>
          <li><a href="all_e">All_E</a></li>
          <li><a href="contact">Contact</a></li>
          <button className="button-86" role="button"><a href="Login" className='active'>Login</a></button>
        </ul>

        <div className="show">
          <div className="header-show">
            <h1>LIST-RECRUITEMENTS</h1>
            <input
              type="text"
              placeholder='Search for Recruitmenets...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <table className="tabelContrats">
            <thead>
              <tr>
                <th>job_position</th>
                <th>applicant_name</th>
                <th>date_interview</th>
                <th>status</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtredRecruitement.map((recr) => (
                <tr key={recr.id}>
                  <td>{recr.job_position}</td>
                  <td>{recr.applicant_name}</td>
                  <td>{recr.date_interview}</td>
                  <td>{recr.status}</td>
                  <td>
                    <button className='Mod' onClick={() => handleUpdate(recr.id)}>
                      Modify
                    </button>
                  </td>
                  <td>
                    <button className='Del' onClick={() => handleDelete(recr.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <UpdateRecrs 
          recrID={recrID} 
          onUpdateRecruitmenet={handleRecruitmenetUpdated} 
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
  );
}

export default ShowRecres

