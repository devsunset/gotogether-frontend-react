import axios from 'axios';
import TokenService from './token.service';

const instance = axios.create({
  //PROD
  baseURL: 'http://193.123.252.22:8282/api',
  //DEV
  // baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
      // config.headers['x-access-token'] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/auth/signin' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          if (TokenService.getLocalRefreshToken() === undefined) {
            alert('로그인 정보가 유효하지 않습니다.');
            dispatch(logout());
            TokenService.removeUser();
            return;
          }

          const rs = await instance.post('/auth/refreshtoken', {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { token } = rs.data.data;
          TokenService.updateLocalAccessToken(token);

          return instance(originalConfig);
        } catch (_error) {
          if (_error.message == 'Request failed with status code 403') {
            alert('로그인 정보가 만료되었습니다 다시 로그인해 주세요.');
            dispatch(logout());
            TokenService.removeUser();
          }
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  },
);

export default instance;
