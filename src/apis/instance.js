import axios from 'axios';

// 创建一个自定义的 Axios 实例
const instance = axios.create({
  baseURL: 'https://mu-api.yuk0.com', // 设置基本的 API 地址
  // baseURL: 'http://127.0.0.1:3000', // 设置基本的 API 地址
  timeout: 8000,
  withCredentials: true, // 启用请求携带cookie
});
// baseURL: 'https://api.trtst.com', // 设置基本的 API 地址

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default instance;