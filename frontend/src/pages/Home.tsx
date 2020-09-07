import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

// styles
import StyledMain from '../styles/StyledMain';
import useWindowWidth from '../hooks/useWindowWidth';

// components
import Header from '../containers/Header';
import MainContainer from '../containers/MainContainer';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  display: flex;
  top: 100px;
  left: 10px;

  button {
    border: 1px solid black;
    border-radius: 6px;
    padding: 5px;
    margin-top: 5px;
  }
`;

function Home() {
  const width = useWindowWidth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <MainContainer />
      </StyledMain>
      <StyledDiv>
        <button onClick={signupEmail}>회원가입</button>
        <button onClick={login}>로그인</button>
        <button onClick={getUser}>내 유저정보 요청</button>
        <button onClick={getRandom}>랜덤 유저 5명 요청</button>
      </StyledDiv>
    </>
  );
}

export default Home;

async function login() {
  const res = await axios.post('/login', {
    user_id: 'user2',
    user_password: 'asdf',
  });

  const { token } = res.data;
  localStorage.setItem('access_token', token);
}

async function getUser() {
  const token = await localStorage.getItem('access_token');
  const res = await axios.get('/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);
}

async function getRandom() {
  const res = await axios.get('/users/random');

  console.log(res);
}

async function signupEmail() {
  await axios.post('/signin/email', {
    user_id: `user${createRandom()}`,
    user_password: `asdf`,
    user_name: `${createRandom()}의 name`,
    user_email: `${createRandom()}의 email`,
  });
}

function createRandom() {
  return Math.floor(Math.random() * 10);
}
