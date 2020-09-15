import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';
import useWindowWidth from '../hooks/useWindowWidth';

// components
import Header from '../components/header/Header';
import HomeMain from '../components/HomeMain';

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
  useAuth();
  const width = useWindowWidth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <HomeMain />
      </StyledMain>
      <StyledDiv>
        <button onClick={signupEmail}>회원가입</button>
        <button onClick={login}>로그인</button>
      </StyledDiv>
    </>
  );
}

export default React.memo(Home);

async function login() {
  const res = await axios.post('/login', {
    user_id: 'user3',
    user_password: 'asdf',
  });

  const { token } = res.data;
  localStorage.setItem('access_token', token);
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
