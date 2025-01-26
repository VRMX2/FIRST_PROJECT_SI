import React, { useState, useEffect } from 'react';
import axios from 'axios';



const UpdateSalaires =({salaireID,onUpdateSalaire}) =>{
  const [type_salaire, settype_salaire] = useState("");
  const [monthely_salary, setmonthely_salary] = useState("");
  const [daily_salary, setdaily_salary] = useState("");
  const [salary_date, setsalary_date] = useState("");
  const [Employe, setEmploye] = useState("");

  useEffect(() => {
    if (salaireID) {
      axios.get(`http://127.0.0.1:8000/api/salaire/${salaireID}/`)
        .then(response => {
          const salaire = response.data;
          settype_salaire(salaire.type_salaire);
          setmonthely_salary(salaire.monthely_salary);
          setdaily_salary(salaire.daily_salary);
          setsalary_date(salaire.salary_date);
          setEmploye(salaire.Employe);
        })
        .catch(error => {
          console.error("Error fetching contract details:", error);
        });
    }
  }, [salaireID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const salaireData = {
      type_salaire,
      monthely_salary,
      daily_salary,
      salary_date,
      Employe:Employe
    };

    const method = salaireID ? 'put' : 'post';
    const url = salaireID
      ? `http://127.0.0.1:8000/api/salaire/${salaireID}/`
      : 'http://127.0.0.1:8000/api/salaire/';

    axios({
      method,
      url,
      data: salaireData,
    })
      .then((response) => {
        onUpdateSalaire();
      })
      .catch((error) => {
        console.error("Error updating contract:", error);
      });
  };

  return (
    <div>
      <form className="form-update-Salary" onSubmit={handleSubmit}>
        <h1>{salaireID ? 'Update Salary' : 'Add Salary'}</h1>
        <div className="inpts-Salary-update">
          <div className="ll2">
            <label htmlFor="type_salaire">Type Salaire</label>
            <input
              type="text"
              placeholder="Type Contrat"
              name="type_salaire"
              value={type_salaire}
              onChange={(e) => settype_salaire(e.target.value)}
              required
            />
          </div>


          <div className="ll2">
            <label htmlFor="monthely_salary">monthely_salary</label>
            <input
              type="number"
              name="monthely_salary"
              placeholder='monthely_salary'
              value={monthely_salary}
              onChange={(e) => setmonthely_salary(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="daily_salary">daily_salary</label>
            <input
              type="number"
              placeholder="daily_salary"
              name="daily_salary"
              value={daily_salary}
              onChange={(e) => setdaily_salary(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="salary_date">salary_date</label>
            <input
              type="date"
              placeholder="salary_date"
              name="salary_date"
              value={salary_date}
              onChange={(e) => setsalary_date(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="Employe">Employe</label>
            <input
              type="number"
              placeholder="Employe"
              name="Employe"
              value={Employe}
              onChange={(e) => setEmploye(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="Done">
          {salaireID ? 'Update Salary' : 'Add Salary'}
        </button>
      </form>
    </div>
  );
}

export default UpdateSalaires
