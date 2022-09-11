import api from './api';
import TokenService from './token.service';

const register = (username, nickname, password) => {
  var email = username + '@email.com';
  return api.post('/auth/signup', {
    username,
    nickname,
    email,
    password,
  });
};

const login = (username, password) => {
  return api
    .post('/auth/signin', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.data.token) {
        TokenService.setUser(response.data.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
