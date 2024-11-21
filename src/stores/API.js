import { defineStore } from 'pinia';

import axios from 'axios';

export const useAPIStore = defineStore('API', () => {
  //定義資料
  const User = axios.create({
    baseURL: '/user/API', // 設定基礎 URL
  });

  const postUser = async (data) => {
    try {
      const res = await User.post('/createUser', data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await User.get('/getUser');
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (id, data) => {
    try {
      const res = await User.post(`/updateUser/${id}`, data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await User.delete(`/deleteUser/${id}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  //返回資料
  return {
    postUser,
    getUser,
    editUser,
    deleteUser,
  };
});
