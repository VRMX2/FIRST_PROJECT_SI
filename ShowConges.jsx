import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateConges from './UpdateConges';

const ShowConges = () => {
  const [conges, setConges] = useState([]);
  const [congeID, setCongeID] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchConges();
  }, []);

  const fetchConges = () => {
    axios
      .get('http://127.0.0.1:8000/api/conges/')
      .then((response) => {
        setConges(response.data);
      })
      .catch((error) => console.log('Error fetching congés:', error));
  };

  const handleUpdate = (congeID) => {
    setCongeID(congeID);
  };

  const handleDelete = async (congeID) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this conge?');
    if (!confirmDelete) return;

    try {
      const response = await axios.delete('http://127.0.0.1:8000/api/conges/${congeID}/')
      if (response.status === 204) {
        setConges((prevConges) => prevConges.filter((conge) => conge.id !== congeID));
      }
    } catch (error) {
      console.error('Failed to delete this conge:', error);
      alert('There was an error deleting this conge, please try again.');
    }
  };

  const handleCongeUpdated = () => {
    setCongeID(null);
    fetchConges();
  };

  const filteredConges = conges.filter((conge) =>
    conge.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="page">
      <div className="home-login">
        <div className="logo">
          <h1>vrmx_HR</h1>
        </div>
        <ul className="header">
          <li><a href="">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="services">Services</a></li>
          <li><a href="all_e">All Employees</a></li>
          <li><a href="contact">Contact</a></li>
          <button className="button-86" role="button"><a href="Login" className="active">Login</a></button>
        </ul>

        <div className="show">
          <div className="header-show">
            <h1>LIST-CONGES</h1>
            <input
              type="text"
              placeholder="Search for Conges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <table className="tabelContrats">
            <thead>
              <tr>
                <th>Date_debut</th>
                <th>Date_fin</th>
                <th>Status</th>
                <th>Type_conge</th>
                <th>Employe</th>
                <th>Modify</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredConges.map((conge) => (
                <tr key={conge.id}>
                  <td>{conge.Date_debut}</td>
                  <td>{conge.Date_fin}</td>
                  <td>{conge.status}</td>
                  <td>{conge.type_conge ? conge.type_conge.type_conge : 'N/A'}</td> 
                  <td>{conge.Employe}</td>
                  <td>
                    <button className="Mod" onClick={() => handleUpdate(conge.id)}>Modify</button>
                  </td>
                  <td>
                    <button className="Del" onClick={() => handleDelete(conge.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <UpdateConges congeID={congeID} onUpdateConge={handleCongeUpdated} />
      </div>
    </div>
  );
};

export default ShowConges;