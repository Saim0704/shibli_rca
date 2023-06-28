import axios from 'axios';

const getToken = () => window.localStorage.getItem('token');

const instance = axios.create({
  // baseURL: 'http://localhost:4000', // local
  baseURL: 'https://rcaback.exatorial.com', // prod
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;
