import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export const getEmployees = (page, employeesPerPage) => 
    api.get(`/employees/${page}/${employeesPerPage}`).then(res => res.data);

export const getEmployeeById = (id) => 
    api.get(`/employees/${id}`).then(res => res.data);
    
export const createEmployee = ({...newEmployee}) => 
    api.post(`/employees`,newEmployee).then(res => res.data);

export const updateEmployee = ({id, ...updatedEmployee}) => 
    api.put(`/employees/${id}`,updatedEmployee).then(res => res.data);

export const deleteEmployee = (id) => 
    api.delete(`/employees/${id}`,deleteEmployee).then(res => res.data);


