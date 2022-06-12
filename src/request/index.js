import axios from "axios";

// 创建一个 axios 实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:9200', // 所有请求地址的前缀部分
  timeout: 600000, // 请求超时毫秒
  // withCredentials: true, // 异步请求携带cookie
})


// 请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // config.headers[""]=token
  return config;
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

//响应拦截器
service.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response;
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error);
});
//导出变量
export default service