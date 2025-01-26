import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [competencies, setCompetencies] = useState(null);
  const [trainings, setTrainings] = useState(null);
  const [evaluations, setEvaluations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeeData, competenciesData, trainingsData, evaluationsData] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/api/employees/${id}/`),
          axios.get(`http://127.0.0.1:8000/api/competencies/${id}/`),
          axios.get(`http://127.0.0.1:8000/api/trainings/${id}/`),
          axios.get(`http://127.0.0.1:8000/api/evaluations/${id}/`),
        ]);

        setEmployee(employeeData.data);
        setCompetencies(competenciesData.data);
        setTrainings(trainingsData.data);
        setEvaluations(evaluationsData.data);
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching employee details', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{employee.nom_employe} {employee.prenom_employe}</h1>
      <p>Email: {employee.email}</p>
      <p>Address: {employee.adresse_employe}</p>
      <p>Date of Hire: {employee.date_embauche}</p>

      <h3>Competencies</h3>
      {competencies && competencies.length > 0 ? (
        <ul>
          {competencies.map((comp) => (
            <li key={comp.id}>
              {comp.name}: {comp.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No competencies available.</p>
      )}

      <h3>Trainings</h3>
      {trainings && trainings.length > 0 ? (
        <ul>
          {trainings.map((training) => (
            <li key={training.id}>
              {training.title}: {training.date_completed}
            </li>
          ))}
        </ul>
      ) : (
        <p>No trainings available.</p>
      )}

      <h3>Evaluations</h3>
      {evaluations && evaluations.length > 0 ? (
        <ul>
          {evaluations.map((evalItem) => (
            <li key={evalItem.id}>
              <p>Performance Score: {evalItem.performance_score}</p>
              <p>Comments: {evalItem.comments}</p>
              <p>Objectives Achieved: {evalItem.objectifs_archieved}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No evaluations available.</p>
      )}
    </div>
  );
};

export default EmployeeDetails;
