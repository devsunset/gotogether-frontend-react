import api from './api';
import Common from './common.js';

const getPublicContent = () => {
  return api.get('/test/all');
};

const getUserInfo = () => {
  return api.get('/userinfo/');
};

const setUserInfoSave = (reqData) => {
  return api.post('/userinfo/', Common.preRequestHandler(reqData));
};

const getUserInfoList = (page, size, reqData) => {
  return api.post('/userinfo/list?page=' + page + '&size=' + size, reqData);
};

const UserService = {
  getPublicContent,
  getUserInfo,
  setUserInfoSave,
  getUserInfoList,
};

export default UserService;
