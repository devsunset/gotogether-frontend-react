import api from './api';
import Common from './common.js';

const getNewReceiveMemo = () => {
  return api.get('/memo/newreceive');
};

const sendMemo = (reqData) => {
  return api.post('/memo/', Common.preRequestHandler(reqData));
};

const getReceiveMemo = (page, size) => {
  return api.get('/memo/receivelist?page=' + page + '&size=' + size);
};

const getSendMemo = (page, size) => {
  return api.get('/memo/sendlist?page=' + page + '&size=' + size);
};

const setReadMemo = (memoId) => {
  return api.post('/memo/updateread/' + memoId);
};

const setDeleteReceiveMemo = (reqData) => {
  return api.delete('/memo/deletereceive', {
    data: {
      idSeparatorValues: reqData,
    },
  });
};

const setDeleteSendMemo = (reqData) => {
  return api.delete('/memo/deletesend', {
    data: {
      idSeparatorValues: reqData,
    },
  });
};

const MemoService = {
  getNewReceiveMemo,
  sendMemo,
  getReceiveMemo,
  getSendMemo,
  setReadMemo,
  setDeleteReceiveMemo,
  setDeleteSendMemo,
};

export default MemoService;
