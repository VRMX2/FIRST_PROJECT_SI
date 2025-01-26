import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateEmployee = ({ employeeID, onEmployeeUpdated }) => {
  const [nom_employe, setNomEmploye] = useState('');
  const [prenom_employe, setPrenomEmploye] = useState('');
  const [date_naissance, setDateNaissance] = useState('');
  const [email, setEmail] = useState('');
  const [image_employee, setImageEmployee] = useState('');
  const [adresse_employe, setAdresseEmploye] = useState('');
  const [date_embauche, setDateEmbauche] = useState('');
  const [Service, setService] = useState('');
  const [training, setTraining] = useState('');
  const [skills, setSkills] = useState('');
  const [sexe, setSexe] = useState('');
  const [anciennite, setAnciennite] = useState('');
  const [date_recrutement, setDateRecrutement] = useState('');

  useEffect(() => {
    if (employeeID) {
      axios.get(`http://127.0.0.1:8000/api/employees/${employeeID}/`)
        .then((response) => {
          const employee = response.data;
          setNomEmploye(employee.nom_employe);
          setPrenomEmploye(employee.prenom_employe);
          setDateNaissance(employee.date_naissance);
          setSexe(employee.sexe);
          setEmail(employee.email);
          setImageEmployee(employee.image_employee);
          setAdresseEmploye(employee.adresse_employe);
          setDateEmbauche(employee.date_embauche);
          setAnciennite(employee.anciennite);
          setDateRecrutement(employee.date_recrutement);
          setTraining(employee.training);
          setSkills(employee.skills);
          setService(employee.Service);
        })
        .catch((error) => console.log(error));
    }
  }, [employeeID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      nom_employe,
      prenom_employe,
      date_naissance,
      sexe,
      email,
      image_employee,
      adresse_employe,
      date_embauche,
      anciennite,
      date_recrutement,
      training,
      skills,
      Service,
    };

    const method = employeeID ? 'put' : 'post';
    const url = employeeID
      ? `http://127.0.0.1:8000/api/employees/${employeeID}/`
      : 'http://127.0.0.1:8000/api/employees/';

    axios({
      method,
      url,
      data: employeeData,
    })
      .then((response) => {
        onEmployeeUpdated();
      })
      .catch((error) => {
        console.error('Error updating employee:', error);
        alert('Error updating employee!');
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-update">
        <h1>{employeeID ? 'Update Employee' : 'Add Employee'}</h1>
        <div className="inpt8">
          <div className="ll3">
            <label htmlFor="nom_employe">First Name</label>
            <input
              type="text"
              value={nom_employe}
              name="nom_employe"
              onChange={(e) => setNomEmploye(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="prenom_employe">Last Name</label>
            <input
              type="text"
              name="prenom_employe"
              value={prenom_employe}
              onChange={(e) => setPrenomEmploye(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="date_naissance">Date of Birth</label>
            <input
              type="date"
              name="date_naissance"
              value={date_naissance}
              onChange={(e) => setDateNaissance(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="sexe">Sexe</label>
            <input
              type="text"
              name="sexe"
              value={sexe}
              onChange={(e) => setSexe(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="image_employee">Image URL</label>
            <input
              type="text"
              name="image_employee"
              value={image_employee}
              onChange={(e) => setImageEmployee(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="adresse_employe">Address</label>
            <input
              type="text"
              name="adresse_employe"
              value={adresse_employe}
              onChange={(e) => setAdresseEmploye(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="date_embauche">Hire Date</label>
            <input
              type="date"
              name="date_embauche"
              value={date_embauche}
              onChange={(e) => setDateEmbauche(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="anciennite">Anciennete</label>
            <input
              type="number"
              name="anciennite"
              value={anciennite}
              onChange={(e) => setAnciennite(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="date_recrutement">Recrutement Date</label>
            <input
              type="date"
              name="date_recrutement"
              value={date_recrutement}
              onChange={(e) => setDateRecrutement(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="training">Training</label>
            <input
              type="text"
              name="training"
              value={training}
              onChange={(e) => setTraining(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
          <div className="ll3">
            <label htmlFor="service">Service</label>
            <input
              type="text"
              name="service"
              value={Service}
              onChange={(e) => setService(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="btnadd">
          {employeeID ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;