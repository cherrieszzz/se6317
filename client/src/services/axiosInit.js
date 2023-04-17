import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // 设置请求的基本URL
  timeout: 5000, // 设置请求超时时间
  headers: {
    'Content-Type': 'application/json' // 设置请求头
  }
});

export default instance;