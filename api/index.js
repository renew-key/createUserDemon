import {
  getUserData,
  postUserData,
  editUserData,
  deleteUserData,
} from './userReq.js';

export const apiGetUserData = getUserData;
export const apiPostUserData = (data) => postUserData(data);
export const apiEditUserData = (id, data) => editUserData(id, data);
export const apiDeleteUserData = (id) => deleteUserData(id);
