import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateEvaluation = ({ evaluationID, onEvaluationUpdated }) => {
    const [date_evaluation, setDateEvaluation] = useState('');
    const [performance_score, setPerformanceScore] = useState('');
    const [comments, setComments] = useState('');
    const [objectifs_archieved, setObjectifsAchieved] = useState('');
    const [strenghts, setStrenghts] = useState('');
    const [areas_for_improvement, setAreasForImprovement] = useState('');
    const [employee, setEmployee] = useState('');

    useEffect(() => {
        if (evaluationID) {
            axios
                .get(`http://127.0.0.1:8000/api/evaluations/${evaluationID}/`)
                .then((response) => {
                    const evaluation = response.data;
                    setDateEvaluation(evaluation.date_evaluation);
                    setPerformanceScore(evaluation.performance_score);
                    setComments(evaluation.comments);
                    setObjectifsAchieved(evaluation.objectifs_archieved);
                    setStrenghts(evaluation.strenghts);
                    setAreasForImprovement(evaluation.areas_for_improvement);
                    setEmployee(evaluation.employee);
                })
                .catch((error) => console.log(error));
        }
    }, [evaluationID]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const evaluationData = {
            date_evaluation,
            performance_score,
            comments,
            objectifs_archieved,
            strenghts,
            areas_for_improvement,
            employee,
        };

        const method = evaluationID ? 'put' : 'post';
        const url = evaluationID
            ? `http://127.0.0.1:8000/api/evaluations/${evaluationID}/`
            : 'http://127.0.0.1:8000/api/evaluations/';

        axios({
            method,
            url,
            data: evaluationData,
        })
            .then((response) => {
                onEvaluationUpdated();
            })
            .catch((error) => console.log('Error submitting evaluation:', error));
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-Evaluation'>
                <h1>{evaluationID ? 'Update Evaluation' : 'Add Evaluation'}</h1>
                <div className="inpt8-eval">
                    <div className="ll7"><label htmlFor="date_evaluation">Date of Evaluation</label><input type="date" value={date_evaluation} name='date_evaluation' onChange={e => setDateEvaluation(e.target.value)} required /></div>
                    <div className="ll7"><label htmlFor="performance_score">Performance Score</label><input type="number" name='performance_score' value={performance_score} placeholder='Performance Score' onChange={e => setPerformanceScore(e.target.value)} required /></div>
                    <div className="ll7"><label htmlFor="comments">Comments</label><input type="text" name='comments' value={comments} placeholder='comments' onChange={e => setComments(e.target.value)} required /></div>
                    <div className="ll7"><label htmlFor="objectifs_archieved">Objectives Achieved</label><input type="text" value={objectifs_archieved} name='objectifs_archieved' placeholder='Objectifs' onChange={e => setObjectifsAchieved(e.target.value)} required /></div>
                    <div className="ll7"><label htmlFor="strenghts">Strengths</label><input type="text" name='strenghts' value={strenghts} placeholder='strenghts ' onChange={e => setStrenghts(e.target.value)} required /></div>
                    <div className="ll7"><label htmlFor="areas_for_improvement">Areas for Improvement</label><input type="text" name='areas_for_improvement' value={areas_for_improvement} placeholder='Area ' onChange={e => setAreasForImprovement(e.target.value)} required /></div>
                    <div className="ll7"><label htmlFor="employee">Employee</label><input type="number" name='employee' value={employee} placeholder='employee ' onChange={e => setEmployee(e.target.value)} required /></div>
                </div>
                <button type="submit" className='btnadd'>{evaluationID ? 'Update Evaluation' : 'Add Evaluation'}</button>
            </form>
        </div>
    );
};

export default UpdateEvaluation;
