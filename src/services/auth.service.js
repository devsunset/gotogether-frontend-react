import axios from 'axios';

const API_URL = 'http://193.123.252.22:8282/api/auth/';

const register = (username, nickname, password) => {
  var email = username + '@email.com';
  return axios.post(API_URL + 'signup', {
    username,
    nickname,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + 'signin', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
