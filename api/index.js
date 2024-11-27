import {
  getUserData,
  postUserData,
  editUserData,
  deleteUserData,
} from './userReq.js';

import {
  postRegisterData,
  postLoginData,
  postVailadeAccount,
} from './authReq.js';

export const apiGetUserData = getUserData;
export const apiPostUserData = (data) => postUserData(data);
export const apiEditUserData = (id, data) => editUserData(id, data);
export const apiDeleteUserData = (id) => deleteUserData(id);

export const apiPostRegisterData = (data) => postRegisterData(data);
export const apiPostLoginData = (data) => postLoginData(data);
export const apiPostVailadeAccountData = (data) => postVailadeAccount(data);
