import axios from 'axios';

const getToken = () => window.localStorage.getItem('token');

export const baseURL = 'http://localhost:4000'; // local
// export const baseURL = 'https://rcaback.exatorial.com', // prod

const instance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    'Access-Control-Allow-Origin': '*',
  },
});

export default instance;
