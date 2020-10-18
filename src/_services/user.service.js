import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';


export const userService = {
    getAll,
    getById,
    deleteID,
    deleteTunti,
    create  
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}
function create(user) {
    const requestOptions = { method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)};
    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function deleteID(id) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function deleteTunti(id) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return fetch(`${config.apiUrl}/api/opettaja/${id}`, requestOptions).then(handleResponse);
}


