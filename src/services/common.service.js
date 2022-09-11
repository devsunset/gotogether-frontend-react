import api from './api';

const getHome = () => {
  return api.get('/common/home');
};

const CommonService = {
  getHome,
};

export default CommonService;
