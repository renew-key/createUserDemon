import { defineStore } from 'pinia';
import {
  apiGetUserData,
  apiPostUserData,
  apiEditUserData,
  apiDeleteUserData,
} from '../../api/index.js';
import axios from 'axios';

export const useAPIStore = defineStore('API', () => {
  //定義資料
  // const msg = ref(null);
  // const value = reactive([]);
  const User = axios.create({
    baseURL: '/user/API', // 設定基礎 URL
  });

  const postUser = async (data) => {
    try {
      const res = await apiPostUserData(data);
      // if (res.status == 200) {
      //   msg.value = res.data.message;
      //   value.value = res.data.value;
      // }

      console.log(res.data);
      return res.data;
    } catch (error) {
      msg.value = error;
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const res = await apiGetUserData();
      console.log(res.data);
      // if (res.status == 200) {
      //   msg.value = res.data.message;
      //   value.value = res.data.value;
      // }
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (id, data) => {
    try {
      const res = await apiEditUserData(id, data);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await apiDeleteUserData(id);
      return res.data; // 返回後端回應資料
    } catch (error) {
      console.error('Failed to delete user:', error); // 打印錯誤訊息
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
