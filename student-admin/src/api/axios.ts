import axios from 'axios'
import { getItemStr } from '../utils'

axios.interceptors.request.use(
  (config) => {
    const token = getItemStr('token')
    token && (config.headers.Authorization = token)
    config.timeout = 10 * 1000 //请求响应时间
    config.baseURL = process.env.REACT_APP_ENV
    config.headers.post['version'] = 'v1'
    config.headers.post['Content-Type'] = 'application/json; charset=utf-8'
    config.data = JSON.stringify(config.data)
    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)
axios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    return Promise.reject(err)
  },
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: object) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          Authorization: getItemStr('token'),
          version: 'v1',
        },
        params: params,
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: object) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
