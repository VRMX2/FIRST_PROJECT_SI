import React, { useState } from 'react';
import axios from 'axios';
import LeaveBalance from './LeaveBalance';

const FormRequestConge = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (new Date(startDate) >= new Date(endDate)) {
      setError("End date must be after start date");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/conges/', {
        type_conge: leaveType,
        Date_debut: startDate,
        Date_fin: endDate,
      });
      setStatus("Leave request submitted successfully!");
    } catch (error) {
      setError("Error submitting leave request.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LeaveBalance onSelectLeaveType={setLeaveType} />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <button type="submit">Submit</button>
      {status && <p>{status}</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default FormRequestConge;
