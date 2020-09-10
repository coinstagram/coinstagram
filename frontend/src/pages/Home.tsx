import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

// styles
import StyledMain from '../components/common/StyledMain';
import useWindowWidth from '../hooks/useWindowWidth';

// components
import Header from '../components/header/Header';
import HomeMain from '../containers/HomeMain';

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
        <HomeMain />
      </StyledMain>
      <StyledDiv>
        <button onClick={signupEmail}>회원가입</button>
        <button onClick={login}>로그인</button>
        <button onClick={upload}>업로드</button>
        <button onClick={getPosts}>전체 게시물</button>
        <button onClick={getComment}>특정 게시물 댓글</button>
        <button onClick={addComments}>특정 게시물 댓글달기</button>
        <button onClick={getAnotherPosts}>다른유저 게시물</button>
        <button onClick={getFollowerPosts}>팔로워들 게시물</button>
        <button onClick={getRandom}>랜던 유저</button>
      </StyledDiv>
    </>
  );
}

export default React.memo(Home);

const token = localStorage.getItem('access_token');

async function addComments() {
  const res = await axios.post(
    '/comment',
    {
      post_id: 2,
      comment_text: '댓글 테스트 post_id 2',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(res);
}

async function getComment() {
  const res = await axios.get('/comment/post/2', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);
}

async function upload() {
  const res = await axios.post(
    '/post',
    {
      post_context: '이야이야 게시물이다 재밌다.',
      post_anotheruser: '태그 유저어어',
      post_location: '건대입구',
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  console.log(res.data);
}

async function getPosts() {
  const res = await axios.get('/posts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);
}

async function getAnotherPosts() {
  const res = await axios.get('/user/post/user3', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);
}

async function getFollowerPosts() {
  const res = await axios.get('/user/relationship/post', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);
}

async function login() {
  const res = await axios.post('/login', {
    user_id: 'user7',
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

async function getRandom() {
  const res = await axios.get('/users/random', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);
}
