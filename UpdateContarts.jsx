import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateContarts = ({ contratId, onUpdateContrats }) => {
  const [type_contrat, setTypeContrat] = useState("");
  const [date_debut, setDateDebut] = useState("");
  const [date_fin, setDateFin] = useState("");
  const [salaire_mensuel, setSalaireMensuel] = useState("");
  const [salaire_quoridien, setSalaireQuoridien] = useState("");
  const [probation_period_end, setprobation_period_end] = useState("");
  const [is_archived, setis_archived] = useState("");
  const [Employe, setEmploye] = useState("");

  useEffect(() => {
    if (contratId) {
      axios.get(`http://127.0.0.1:8000/api/contrats/${contratId}/`)
        .then(response => {
          const contrat = response.data;
          setTypeContrat(contrat.type_contrat);
          setDateDebut(contrat.date_debut);
          setDateFin(contrat.date_fin);
          setSalaireMensuel(contrat.salaire_mensuel);
          setSalaireQuoridien(contrat.salaire_quoridien);
          setprobation_period_end(contrat.probation_period_end);
          setis_archived(contrat.is_archived);
          setEmploye(contrat.Employe);
        })
        .catch(error => {
          console.error("Error fetching contract details:", error);
        });
    }
  }, [contratId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contractData = {
      type_contrat,
      date_debut,
      date_fin,
      salaire_mensuel,
      salaire_quoridien,
      probation_period_end,
      is_archived,
      Employe
    };

    const method = contratId ? 'put' : 'post';
    const url = contratId
      ? `http://127.0.0.1:8000/api/contrats/${contratId}/`
      : 'http://127.0.0.1:8000/api/contrats/';

    axios({
      method,
      url,
      data: contractData,
    })
      .then((response) => {
        onUpdateContrats();
      })
      .catch((error) => {
        console.error("Error updating contract:", error);
      });
  };

  return (
    <div>
      <form className="form-update-Contrat" onSubmit={handleSubmit}>
        <h1>{contratId ? 'Update Contrat' : 'Add Contrat'}</h1>
        <div className="inpts-contrat-update">
          <div className="ll2">
            <label htmlFor="type_contrat">Type Contrat</label>
            <input
              type="text"
              placeholder="Type Contrat"
              name="type_contrat"
              value={type_contrat}
              onChange={(e) => setTypeContrat(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="date_debut">Date Debut</label>
            <input
              type="date"
              name="date_debut"
              value={date_debut}
              onChange={(e) => setDateDebut(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="date_fin">Date Fin</label>
            <input
              type="date"
              name="date_fin"
              value={date_fin}
              onChange={(e) => setDateFin(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="salaire_mensuel">Salaire Mensuel</label>
            <input
              type="number"
              placeholder="Salaire Mensuel"
              name="salaire_mensuel"
              value={salaire_mensuel}
              onChange={(e) => setSalaireMensuel(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="salaire_quoridien">Salaire Quotidien</label>
            <input
              type="number"
              placeholder="Salaire Quotidien"
              name="salaire_quoridien"
              value={salaire_quoridien}
              onChange={(e) => setSalaireQuoridien(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="probation_period_end">probation_period_end</label>
            <input
              type="date"
              placeholder="probation_period_end"
              name="probation_period_end"
              value={probation_period_end}
              onChange={(e) => setprobation_period_end(e.target.value)}
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
          {contratId ? 'Update Contrat' : 'Add Contrat'}
        </button>
      </form>
    </div>
  );
};

export default UpdateContarts;
