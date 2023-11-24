import axios from 'axios';

// 创建一个自定义的 Axios 实例
const instance = axios.create({
  baseURL: 'https://api.trtst.com', // 设置基本的 API 地址
});

export default instance;