import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LeaveBalance = ({ employeeId, leaveTypeId }) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/BalanceConges/${employeeId}/${leaveTypeId}/`)
      .then(response => {
        setBalance(response.data.balance);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching leave balance", error);
        setLoading(false);
      });
  }, [employeeId, leaveTypeId]);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>Remaining balance: {balance} days</p>}
    </div>
  );
};

export default LeaveBalance;
