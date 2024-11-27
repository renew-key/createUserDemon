import axios from 'axios';

const user = axios.create({
  baseURL: '/user/register', // 設定基礎 URL
});

export const postRegisterData = (data) => user.post('/register', data);
export const postLoginData = (data) => user.post('/login', data);
export const postVailadeAccount = (data) =>
  user.put(`/RegisterSuccess/${data}`);
