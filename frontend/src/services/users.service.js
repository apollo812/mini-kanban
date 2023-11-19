import  { authHeader, handleResponse } from '../utils';
import { API_BASE } from '../config/constants';

const login = async (email, password) => {
    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email, password})
    };

    const response = await fetch(`${API_BASE}/auth/login`, requestOptions);
    const user = await handleResponse(response);
    localStorage.setItem('user', JSON.stringify(user.data));
    return user;
}

const logout = () => {
    localStorage.removeItem('user');
}

const registerUser = async (user) => {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        },
        body: JSON.stringify(user)
    };

    const response = fetch(`${API_BASE}/auth/register`, requestOptions);
    return await handleResponse(response, logout);
}

export const userService = {
    login,
    logout,
    registerUser
}