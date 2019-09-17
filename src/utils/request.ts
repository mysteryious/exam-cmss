import axios from "axios"
import { getToken } from './cookie';
const Url = {
  '123.206.55.50': "//exam.jasonandjay.com",
  '127.0.0.1:5500': '//169.254.195.113:7001',
  'jasonandjay.com':"//exam.jasonandjay.com"
}

const request = axios.create({
  baseURL: Url[window.location.host],
  timeout: 1000,
  headers: {
    'authorization': getToken()
  }
})

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
