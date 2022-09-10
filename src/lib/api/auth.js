import client from './client';

// 로그인
export const login = ({ username, password }) =>
  client.post('/auth/signin', { username, password });

// 회원가입
export const register = ({ username, password }) =>
  client.post('/auth/register', { username, password });

// 로그인 상태 확인
export const check = () => client.get('/auth/check');

// 로그아웃
export const logout = () => client.post('/auth/logout');
