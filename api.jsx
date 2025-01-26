import axios from 'axios';

const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api/' });

export const fetchEmployees = () => api.get('employees/');
export const fetchContracts = () => api.get('contracts/');
export const createContract = (contract) => api.post('contracts/', contract);
export const updateContract = (id, contract) => api.put(contracts/${id}/, contract);
export const deleteContract = (id) => api.delete(contracts/${id}/);