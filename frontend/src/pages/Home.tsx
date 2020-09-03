import React from 'react';
import axios from 'axios';

// styles
import StyledMain from '../styles/StyledMain';
import useWindowWidth from '../hooks/useWindowWidth';

// components
import Header from '../components/header/Header';
import MainContainer from '../containers/MainContainer';

function Home() {
  const width = useWindowWidth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <MainContainer />
      </StyledMain>
      <button onClick={getUsers}>유저 get버튼</button>
      <button onClick={getUser}>유저한명 get버튼</button>
      <button onClick={signupPhone}>회원가입 버튼</button>
      <button onClick={getFollower}>follower 검색</button>
      <button onClick={getFollowee}>followee 검색</button>
      <button onClick={followUser}>팔로우하기</button>
    </>
  );

  async function followUser() {
    const res = await axios.post('/relationship', {
      data: {
        follower_id: 'user1',
        followee_id: 'user2',
      },
    });

    console.log(res.data);
  }

  async function followCancel() {}

  async function getFollower() {
    const res = await axios.get('/relationship/follower');
  }

  async function getFollowee() {
    const res = await axios.get('/relationship/followee');
  }

  async function getUsers() {
    const res = await axios.get('/users');
    console.log(res.data);
  }

  async function getUser() {
    const res = await axios.get('/user', {
      params: { user_id: 'user1' },
    });

    console.log(res.data);
  }

  async function signupPhone() {
    await axios.post('/user/phone', {
      user_id: `${createRandom()}`,
      user_password: `${createRandom()}의 password`,
      user_name: `${createRandom()}의 name`,
      user_phone: `${createRandom()}의 phone`,
    });
  }
}

function createRandom() {
  return Math.floor(Math.random() * 10);
}

export default Home;
