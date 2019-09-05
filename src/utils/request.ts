import axios from "axios"
import {getToken} from './cookie';

const request = axios.create({
  baseURL: 'http://127.0.0.1:7001',
  timeout: 1000,
  headers: {'authorization': getToken()}
});

request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})


request.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default request
