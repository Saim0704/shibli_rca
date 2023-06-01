import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://64.227.138.149',
  // baseURL: 'https://shiblirca.m3rashid.in',
  baseURL: 'http://rcaback.exatorial.com',
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('token')}`,
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 5000,
});

export default instance;
