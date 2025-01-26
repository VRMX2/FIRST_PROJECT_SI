import React, { useEffect, useState } from 'react';
import { faTiktok, faFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMoneyCheckDollar, faPeopleArrows, faPersonCircleCheck, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import UpdateContarts from './UpdateContarts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShowContarts = () => {
  const [services, setservices] = useState(null);
  const [tables, settables] = useState(null);
  const [contrats, setContrats] = useState([]);
  const [contratsSelectedId, setContratsSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

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
    const fetchContrats = () => {
      axios.get(`http://localhost:8000/api/contrats/?type_contrat=${filter}`)
        .then(response => {
          setContrats(response.data);
        })
        .catch(error => {
          console.error('Il y a eu une erreur avec l\'appel API !', error);
        });
    };

    fetchContrats();
  }, [filter]);  


  const handleArchive = (id) => {
    axios.patch(`http://localhost:8000/api/contrats/${id}/`, { is_archived: true })
      .then(response => {
        setContrats(contrats.map(contract =>
          contract.id === id ? { ...contract, is_archived: true } : contract
        ));
      })
      .catch(error => {
        console.error('Erreur lors de l\'archivage du contrat', error);
      });
  };


  const filteredContrats = contrats.filter((contrat) =>
    contrat.type_contrat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteContrats = async (contratId) => {
    const alertRemove = window.confirm('Are you sure you want to delete this contract?');
    if (!alertRemove) return;

    try {
      const response = await axios.delete(`http://127.0.0.1:8000/api/contrats/${contratId}/`);
      if (response.status === 204) {
        setContrats((prevContrats) => prevContrats.filter((contrat) => contrat.id !== contratId));
        alert('Contract deleted successfully');
      }
    } catch (error) {
      alert('Failed to delete this contract');
      console.error('Error deleting contract:', error);
    }
  };

  // Handle contract update action
  const handleUpdate = (contratId) => {
    setContratsSelectedId(contratId);
  };

  // Refresh contracts after an update
  const handleUpdatedContrats = () => {
    setContratsSelectedId(null);
    // This will reload contracts if necessary
    // Re-trigger contract fetching by setting the same filter
    setFilter((prevFilter) => prevFilter);
  };

  // Print selected contract details
  const printContract = (contract) => {
    const printContent = `
      <html>
        <head>
          <title>Contrat Details</title>
          <style>
            body { font-family: Arial, sans-serif; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; font-weight: bold; }
            td { font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>Contrat Details</h1>
          <table>
            <tr><th>Type de Contrat</th><td>${contract.type_contrat}</td></tr>
            <tr><th>Date de Début</th><td>${contract.date_debut}</td></tr>
            <tr><th>Date de Fin</th><td>${contract.date_fin}</td></tr>
            <tr><th>Salaire Mensuel</th><td>${contract.salaire_mensuel}</td></tr>
            <tr><th>Salaire Quotidien</th><td>${contract.salaire_quoridien}</td></tr>
            <tr><th>Fin de Période d'Essai</th><td>${contract.probation_period_end}</td></tr>
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
    <div className="page">
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
          <button className="button-86" role="button"><a href="Login" className="active">Login</a></button>
        </ul>

        <div className="show">
          <div className="header-show">
            <h1>LIST-CONTRATS</h1>
            <input
              type="text"
              placeholder="Search for Contracts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <table className="tabelContrats" id="contrats-list">
            <thead>
              <tr>
                <th>Type de Contrat</th>
                <th>Date de Début</th>
                <th>Date de Fin</th>
                <th>Salaire Mensuel</th>
                <th>Salaire Quotidien</th>
                <th>Fin de Période d'Essai</th>
                <th>Employé</th>
                <th>Modifier</th>
                <th>Supprimer</th>
                <th>Imprimer</th>
              </tr>
            </thead>
            <tbody>
              {filteredContrats.map((contrat) => (
                <tr key={contrat.id}>
                  <td>{contrat.type_contrat}</td>
                  <td>{contrat.date_debut}</td>
                  <td>{contrat.date_fin}</td>
                  <td>{contrat.salaire_mensuel}</td>
                  <td>{contrat.salaire_quoridien}</td>
                  <td>{contrat.probation_period_end}</td>
                  <td>{contrat.Employe}</td>
                  <td>
                    <button className="Mod" onClick={() => handleUpdate(contrat.id)}>
                      Modifier
                    </button>
                  </td>
                  <td>
                    <button className="Del" onClick={() => handleDeleteContrats(contrat.id)}>
                      Supprimer
                    </button>
                  </td>
                  <td>
                    <button onClick={() => printContract(contrat)} className='impr'>
                      Imprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        <UpdateContarts
          contratId={contratsSelectedId}
          onUpdateContrats={handleUpdatedContrats}
        />
      </div>

      <h1>Gestion des Contrats</h1>
      <div>
        <label>Filtrer par type de contrat:</label>
        <select onChange={(e) => setFilter(e.target.value)}>
          <option value="">Tous</option>
          <option value="CDI">CDI</option>
          <option value="CDD">CDD</option>
          <option value="STAGE">Stage</option>
          <option value="SPECIFIC">Autre spécifique</option>
        </select>
      </div>

      <ul>
        {contrats.map((contract) => (
          <li key={contract.id}>
            {contract.Employe.prenom_employe} {contract.Employe.nom_emoloye} - {contract.type_contrat} -
            {contract.date_debut}
            {contract.date_fin && ` - ${contract.date_fin}`}
            <button onClick={() => handleArchive(contract.id)}>Archiver</button>
          </li>
        ))}
      </ul>

      <ul className="reseaux-soc-services">
        <li><a href="https://www.tiktok.com/@verox_x1"><FontAwesomeIcon icon={faTiktok} /></a></li>
        <li><a href="https://www.facebook.com/profile.php?id=61571482892345"><FontAwesomeIcon icon={faFacebook} /></a></li>
        <li><a href="https://www.instagram.com/vrmx_l"><FontAwesomeIcon icon={faInstagram} /></a></li>
        <li><a href="https://github.com/VRMX2"><FontAwesomeIcon icon={faGithub} /></a></li>
      </ul>
    </div>
  );
};

export default ShowContarts;
