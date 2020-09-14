import React, { useState } from 'react';
import styled from 'styled-components';

import { MainLogo } from '../components/Join/JoinHeaderStyle';
import InputUserId from '../components/common_login,join/InputUserId';
import InputPassword from '../components/common_login,join/InputPassword';
import { StyledLogin } from '../components/login/LoginStyle';
import JoinLoginButton from '../components/common_login,join/JoinLoginButton';

import { useDispatch } from 'react-redux';
import { signInSagaActionCreator } from '../redux/modules/auth';
import axios from 'axios';
const StyledForm = styled.form``;

function LoginContainer() {
  const [user_password, setPassword] = useState('');
  const [user_id, setUserId] = useState('');

  const onInputPassword = (text: string): void => {
    setPassword(text);
  };
  const onInputUserId = (text: string): void => {
    setUserId(text);
  };

  const dispatch = useDispatch();
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(signInSagaActionCreator(user_id, user_password));
  };

  // async function signin() {
  //   const res = await axios({
  //     method: 'POST',
  //     url: '/login',
  //     data: {
  //       user_id,
  //       user_password, // 이렇게 정보 요청을 하고 token을 받아야 함
  //     },
  //   });
  //   console.log('result', res);
  // return res.data; //  token
  // 로컬스토리지에 저장->서비스에 담기
  // 성공하면 라우팅() -> 사가에서 구현
  // connetedRouter
  // }
  return (
    <>
      {/* <button onClick={signin}>테스트용</button> */}
      <StyledLogin>
        <MainLogo style={{ marginBottom: '40px' }}>coInstagram</MainLogo>
        <StyledForm onSubmit={handleSubmit}>
          <InputUserId userId={user_id} onInputUserId={onInputUserId} />
          <InputPassword
            userPassword={user_password}
            onInputPassword={onInputPassword}
            style={{ marginBottom: '20px' }}
          />
          <JoinLoginButton content="로그인" />
        </StyledForm>
      </StyledLogin>
    </>
  );
}
export default React.memo(LoginContainer);
