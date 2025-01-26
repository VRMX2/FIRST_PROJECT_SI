import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateEvaluation from './UpdateEvaluation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faTiktok , faFacebook, faInstagram, faGithub} from '@fortawesome/free-brands-svg-icons';


const ShowEvaluations = () => {
  const [services, setservices] = useState(null)
  const [tables,settables] = useState(null)
  const [evaluations, setEvaluations] = useState([]);
  const [evaluationID, setEvaluationID] = useState(null);
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
    fetchEvaluations();
  }, []);

  const fetchEvaluations = () => {
    axios
      .get('http://127.0.0.1:8000/api/evaluations/')
      .then((response) => setEvaluations(response.data))
      .catch((error) => console.log(error));
  };

  // Handle delete evaluation
  const handleDelete = async (evaluationID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this evaluation?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/evaluations/${evaluationID}/`);
      if (response.status === 204) {
        setEvaluations((prevEvaluations) =>
          prevEvaluations.filter((evaluation) => evaluation.id !== evaluationID)
        );
        alert('Evaluation deleted successfully!');
      } else {
        alert('Failed to delete evaluation.');
      }
    } catch (error) {
      console.error('Error deleting evaluation:', error);
      alert('Error deleting evaluation');
    }
  };

  const handleUpdate = (evaluationID) => {
    setEvaluationID(evaluationID);
  };

  const handleEvaluationUpdated = () => {
    setEvaluationID(null);
    fetchEvaluations();
  };

  const filteredEvaluations = evaluations.filter((evaluation) =>
    evaluation.performance_score.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page">
      <div className="home-login">
        <div className="logo">
          <h1>vrmx_HR</h1>
        </div>
        <ul className="header">
          <li><a href="/">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="services"  onMouseOver={HandleMouseOvers}>Services</a></li>
          <li><a href="all_e">All Employees</a></li>
          <li><a href="contact">Contact</a></li>
          <button className="button-86" role="button"><a href="Login" className="active">Login</a></button>
        </ul>

        <div className="show">
          <div className="header-show">
            <h1>EVALUATIONS</h1>
            <input
              type="text"
              placeholder="Search for Performance Score..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <table className="tablesEvaluation">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date of Evaluation</th>
                <th>Performance Score</th>
                <th>Comments</th>
                <th>Objectives Achieved</th>
                <th>Strengths</th>
                <th>Areas for Improvement</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvaluations.map((evaluation) => (
                <tr key={evaluation.id}>
                  <td>{evaluation.employee}</td>
                  <td>{evaluation.date_evaluation}</td>
                  <td>{evaluation.performance_score}</td>
                  <td>{evaluation.comments}</td>
                  <td>{evaluation.objectifs_archieved}</td>
                  <td>{evaluation.strenghts}</td>
                  <td>{evaluation.areas_for_improvement}</td>
                  <td>
                    <button className="Mod" onClick={() => handleUpdate(evaluation.id)}>Modify</button>

                  </td>
                  <td>
                  <button className="Del" onClick={() => handleDelete(evaluation.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="reseaux-soc-services">
         <li><a href="https://www.tiktok.com/@verox_x1?_t=ZM-8tEXbT1J7t0&_r=1"><FontAwesomeIcon icon={faTiktok} /></a></li>
                                                           <li><a href="https://www.facebook.com/profile.php?id=61571482892345&mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebook} /></a></li>
                                                           <li><a href="https://www.instagram.com/vrmx_l?igsh=djN2bXQ2bjAzb285"><FontAwesomeIcon icon={faInstagram} /></a></li>
                                                           <li><a href="https://github.com/VRMX2"><FontAwesomeIcon icon={faGithub} /></a></li>
      </ul>


          <UpdateEvaluation
            evaluationID={evaluationID}
            onEvaluationUpdated={handleEvaluationUpdated}
          />
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

export default ShowEvaluations;
