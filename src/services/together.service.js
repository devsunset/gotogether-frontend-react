import api from './api';
import Common from './common.js';

const getTogetherList = (page, size, reqData) => {
  return api.post('/together/list?page=' + page + '&size=' + size, reqData);
};

const getTogether = (togetherId) => {
  return api.get('/together/' + togetherId);
};

const setTogether = (reqData) => {
  return api.post('/together/', Common.preRequestHandler(reqData));
};

const putTogether = (togetherId, reqData) => {
  return api.put('/together/' + togetherId, Common.preRequestHandler(reqData));
};

const deleteTogether = (togetherId) => {
  return api.delete('/together/' + togetherId);
};

const changeTogetherCategory = (togetherId) => {
  return api.put('/together/changecategory/' + togetherId);
};

// TogetherComment
const getTogetherCommentList = (togetherId) => {
  return api.get('/togethercomment/list/' + togetherId);
};

const deleteTogetherComment = (togetherCommentId) => {
  return api.delete('/togethercomment/' + togetherCommentId);
};

const setTogetherComment = (reqData) => {
  return api.post('/togethercomment/', Common.preRequestHandler(reqData));
};

const TogetherService = {
  getTogetherList,
  getTogether,
  setTogether,
  putTogether,
  deleteTogether,
  changeTogetherCategory,
  getTogetherCommentList,
  deleteTogetherComment,
  setTogetherComment,
};
export default TogetherService;
