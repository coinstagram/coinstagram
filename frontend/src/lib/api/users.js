import client from './client';

// 유저 정보
export const login = () => client.get('/users');
