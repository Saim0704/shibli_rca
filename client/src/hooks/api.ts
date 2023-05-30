import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
  },
  timeout: 5000,
});

export default instance;
