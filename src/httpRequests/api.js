import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8080'
axios.defaults.withCredentials = true
axios.defaults.headers = {
  'Content-Type': 'application/json'
}

export const request_login = params => {
  // return axios.post('/user/signIn', params);
  return axios({
    url: '/login',
    method: 'post',
    data: params,
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
}

export const request_register = params => {
  return axios.post('/register', params)
}

export const request_logout = () => {
  return axios.put('/signOut')
}

export const request_commodity_insert = params => {
  return axios.post('/function/commodity/insert', params)
}

export const request_commodity_delete = id => {
  return axios.delete('/function/commodity/delete/' + id)
}

export const request_commodity_update = params => {
  return axios.post('/function/commodity/update', params)
}

export const request_commodity_find = () => {
  return axios.get('/function/commodity/find')
}

export const request_car_insert = params => {
  return axios.post('/function/car/insert', params)
}

export const request_car_delete = id => {
  return axios.delete('/function/car/delete/' + id)
}

export const request_car_update = params => {
  return axios.post('/function/car/update', params)
}

export const request_car_find = () => {
  return axios.get('/function/car/find')
}

export const request_user_delete = id => {
  return axios.delete('/function/user/delete/' + id)
}

export const request_user_find = () => {
  return axios.get('/function/user/find')
}

export const request_get_info = () => {
  return axios.get('/user')
}

export const request_get_useronline = () => {
  return axios.get('/userCount')
}
