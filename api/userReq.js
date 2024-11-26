import axios from 'axios';

const user = axios.create({
  baseURL: '/user/API', // 設定基礎 URL
});

export const getUserData = () => user.get('/getUser');
export const postUserData = (data) => user.post('/createUser', data);
export const editUserData = (id, data) => user.put(`/editUser/${id}`, data);
export const deleteUserData = (id) => user.delete(`/deleteUser/${id}`);
