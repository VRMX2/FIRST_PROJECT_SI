import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const EmployeeDashboard = () => {
  const [statistiques, setStatistiques] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/statistiques/employe/')
      .then((response) => {
        setStatistiques(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!statistiques) {
    return <div>Loading...</div>;
  }

  const performanceScoreData = {
    labels: statistiques.score_performance.map(item => `Employee ID: ${item.employee}`),
    datasets: [
      {
        label: 'Average Performance Score',
        data: statistiques.score_performance.map(item => item.avg_score),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57'],
      },
    ],
  };

  const sexDistributionData = {
    labels: statistiques.diversite_sexe.map(item => item.sexe),
    datasets: [
      {
        label: 'Gender Distribution',
        data: statistiques.diversite_sexe.map(item => item.count),
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const seniorityDistributionData = {
    labels: statistiques.iversite_anciennete.map(item => `Seniority: ${item.anciennite} years`),
    datasets: [
      {
        label: 'Seniority Distribution',
        data: statistiques.iversite_anciennete.map(item => item.count),
        backgroundColor: ['#FF5733', '#33FF57', '#FFC300', '#6a5acd'],
      },
    ],
  };

  const topPerformers = statistiques.top_performeurs.map((item, index) => (
    <div key={index} className="performer-item">
      <h4 >{`Employee ID: ${item.employee}`}</h4>
      <p>{`Average Performance Score: ${item.moyenne_score.toFixed(2)}`}</p>
    </div>
  ));

  return (
    <div className='page'>
      <div className="home-login">
        <div className="logo">
          <h1>vrmx_HR</h1>
        </div>
        <ul className="header">
          <li><a href="">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="services">Services</a></li>
          <li><a href="all_e">All_E</a></li>
          <li><a href="contact">Contact</a></li>
          <button className="button-86" role="button"><a href="Login" className='active'>Login</a></button>
        </ul>

        <div className="statistique_employe">
          <div className="header-dashboards">
            <h1>HR Analytics Dashboard</h1>
          </div>

          <div className="all-boxes">
            <div className="box-total-employees">
              <h3>Total Employees: 
                <br />{statistiques.total_employees}</h3>
            </div>

            <div className="chart-container">
              <h3>Performance Scores Distribution</h3>
              <Bar data={performanceScoreData} className='bar'/>
            </div>

            <div className="container2">
              <h3>Gender Distribution</h3>
              <Pie data={sexDistributionData} className='pie2'/>
            </div>

            <div className="container3">
              <h3>Seniority Distribution</h3>
              <Pie data={seniorityDistributionData} className='pie3'/>
            </div>
            <div className="performers">
              <h3>Top Performers</h3>
              <div className="performers-list">
                {topPerformers}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
