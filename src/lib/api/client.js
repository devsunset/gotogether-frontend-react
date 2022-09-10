import axios from 'axios';

const client = axios.create();

// Prod
client.defaults.baseURL = 'http://193.123.252.22:8282/api';

// Dev
// client.defaults.baseURL = 'http://localhost:8081/api';

axios.defaults.headers.post['Content-Type'] = 'application/json';

// 헤더 설정
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

// 인터셉터 설정
// 요청 인터셉터 추가
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    // ...
    return config;
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    // ...
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가
axios.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    // ...
    return response;
  },
  function (error) {
    // 오류 응답을 처리
    // ...
    return Promise.reject(error);
  },
);

export default client;
