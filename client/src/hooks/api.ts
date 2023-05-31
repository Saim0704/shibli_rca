import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://64.227.138.149',
  baseURL: 'https://shiblirca.m3rashid.in',
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
  },
  timeout: 5000,
});

export default instance;
