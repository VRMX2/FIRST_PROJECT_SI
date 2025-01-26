import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateRecrs =({recrID,onUpdateRecruitmenet}) =>{
  const [job_position, setjob_position] = useState("");
  const [applicant_name, setapplicant_name] = useState("");
  const [date_interview, setdate_interview] = useState("");
  const [status,setstatus] = useState("");

  useEffect(() => {
    if (recrID) {
        axios.get(`http://127.0.0.1:8000/api/recs/${recrID}/`)
        .then(response => {
          const recr = response.data;
          setjob_position(recr.job_position);
          setapplicant_name(recr.applicant_name);
          setdate_interview(recr.date_interview);
          setstatus(recr.status);
        })
        .catch(error => {
          console.error("Error fetching contract details:", error);
        });
    }
  }, [recrID]);




  const handleSubmit = (e) => {
    e.preventDefault();

    const RecrData = {
      job_position,
      applicant_name,
      date_interview,
      status
    };

    const method = recrID ? 'put' : 'post';
    const url = recrID
      ? `http://127.0.0.1:8000/api/recs/${recrID}/`
      : 'http://127.0.0.1:8000/api/recs/';

    axios({
      method,
      url,
      data: RecrData,
    })
      .then((response) => {
        onUpdateRecruitmenet();
      })
      .catch((error) => {
        console.error("Error updating contract:", error);
      });
  };

  return (
    <div>
      <form className="form-update-recs" onSubmit={handleSubmit}>
        <h1>{recrID ? 'Update Recruitement' : 'Add Recruitement'}</h1>
        <div className="inpts-recs-update">
          <div className="ll2">
            <label htmlFor="job_position">job_position </label>
            <input
              type="text"
              placeholder="job_position"
              name="job_position"
              value={job_position}
              onChange={(e) => setjob_position(e.target.value)}
              required
            />
          </div>


          <div className="ll2">
            <label htmlFor="applicant_name">applicant_name</label>
            <input
              type="text"
              name="applicant_name"
              placeholder='applicant_name'
              value={applicant_name}
              onChange={(e) => setapplicant_name(e.target.value)}
              required
            />
          </div>

        

          <div className="ll2">
            <label htmlFor="date_interview">date_interview</label>
            <input
              type="date"
              placeholder="date_interview"
              name="date_interview"
              value={date_interview}
              onChange={(e) => setdate_interview(e.target.value)}
              required
            />
          </div>

          <div className="ll2">
            <label htmlFor="status">status</label>
            <input
              type="text"
              placeholder="status"
              name="status"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit" className="Done">
          {recrID ? 'Update Recruitement' : 'Add Recruitement'}
        </button>
      </form>
    </div>
  );
}

export default UpdateRecrs

