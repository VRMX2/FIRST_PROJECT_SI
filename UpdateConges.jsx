import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateConges = ({ congeID, onUpdateConge }) => {
  const [Date_debut, setDate_debut] = useState('');
  const [Date_fin, setDate_fin] = useState('');
  const [type_conge, setType_conge] = useState(''); 
  const [status, setStatus] = useState('');
  const [Employe, setEmploye] = useState('');
  const [typesConge, setTypesConge] = useState([]);
  const [employes, setEmployes] = useState([]);

  useEffect(() => {
    if (congeID) {
      axios
        .get(`http://127.0.0.1:8000/api/conges/${congeID}/`)
        .then((response) => {
          const conge = response.data;
          setType_conge(conge.type_conge.id);
          setDate_debut(conge.Date_debut);
          setDate_fin(conge.Date_fin);
          setStatus(conge.status);
          setEmploye(conge.Employe); 
        })
        .catch((error) => console.error('Error fetching conge data:', error));
    }


    axios
      .get('http://127.0.0.1:8000/api/TypesConges/')
      .then((response) => {
        setTypesConge(response.data);
      })
      .catch((error) => console.error('Error fetching types of conge:', error));

    axios
      .get('http://127.0.0.1:8000/api/employees/')
      .then((response) => {
        setEmployes(response.data);
      })
      .catch((error) => console.error('Error fetching employees:', error));
  }, [congeID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const congeData = {
      type_conge,  
      Date_debut,
      Date_fin,
      status,
      Employe, 
    };

    const method = congeID ? 'put' : 'post';
    const url = congeID
      ? `http://127.0.0.1:8000/api/conges/${congeID}/`
      : 'http://127.0.0.1:8000/api/conges/';

    axios({
      method,
      url,
      data: congeData,
    })
      .then(() => {
        onUpdateConge();
      })
      .catch((error) => {
        console.error('Error updating conge:', error);
      });
  };

  return (
    <div>
      <form className="form-update-conge" onSubmit={handleSubmit}>
        <h1>{congeID ? 'Update Conge' : 'Add Conge'}</h1>
        <div className="inpts-conge-update">
  
          <div className="ll2">
            <label htmlFor="type_conge">Type of Congé</label>
            <select
              name="type_conge"
              value={type_conge}
              onChange={(e) => setType_conge(e.target.value)}
              required
            >
              <option value="">Select Type of Congé</option>
              {typesConge.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.type_conge} 
                </option>
              ))}
            </select>
          </div>

          <div className="ll2">
            <label htmlFor="Date_debut">Date_debut</label>
            <input
              type="date"
              placeholder="Date_debut"
              name="Date_debut"
              value={Date_debut}
              onChange={(e) => setDate_debut(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="Date_fin">Date_fin</label>
            <input
              type="date"
              placeholder="Date_fin"
              name="Date_fin"
              value={Date_fin}
              onChange={(e) => setDate_fin(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              placeholder="Status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="Employe">Employe</label>
            <select
              name="Employe"
              value={Employe}
              onChange={(e) => setEmploye(e.target.value)}
              required
            >
              <option value="">Select Employe</option>
              {employes.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nom_employe} 
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="Done">
          {congeID ? 'Update Conge' : 'Add Conge'}
        </button>
      </form>
    </div>
  );
};

export default UpdateConges;
