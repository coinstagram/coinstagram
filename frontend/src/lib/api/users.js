import client from './client';

// 로그인
export const login = () =>
  client.post('/login', {
    user_id: '가입합니다.',
    user_password: 1234,
  });
