import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateServices = ({ serviceID, onUpdateService }) => {
  const [nom_service, setNomService] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (serviceID) {
      axios
        .get(`http://127.0.0.1:8000/api/services/${serviceID}/`)
        .then((response) => {
          const service = response.data;
          setNomService(service.nom_service);
          setDescription(service.description); 
        })
        .catch((error) => console.log(error));
    }
  }, [serviceID]);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const serviceData = {
      nom_service: nom_service,
      description: description, 
    };

    const method = serviceID ? 'put' : 'post'; 
    const url = serviceID
      ? `http://127.0.0.1:8000/api/services/${serviceID}/`
      : 'http://127.0.0.1:8000/api/services/';

    axios({
      method,
      url,
      data: serviceData,
    })
      .then((response) => {
        onUpdateService();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form className="form-update-service" onSubmit={handleSubmit}>
        <h1>{serviceID ? 'Update Service' : 'Add Service'}</h1>
        <div className="inpts-services-update">
          <div className="ll2">
            <label htmlFor="nom_service">Nom Service</label>
            <input
              type="text"
              placeholder="Nom Service"
              name="nom_service"
              value={nom_service}
              onChange={(e) => setNomService(e.target.value)}
              required
            />
          </div>
          <div className="ll2">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="Done">
          {serviceID ? 'Update Service' : 'Add Service'}
        </button>
      </form>
    </div>
  );
};

export default UpdateServices;
