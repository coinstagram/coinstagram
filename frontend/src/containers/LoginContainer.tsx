import React, { useState } from 'react';
import styled from 'styled-components';

import { MainLogo } from '../components/Join/JoinHeaderStyle';
import InputUserId from '../components/common_login,join/InputUserId';
import InputPassword from '../components/common_login,join/InputPassword';
import { StyledLogin } from '../components/login/LoginStyle';
import JoinLoginButton from '../components/common_login,join/JoinLoginButton';

import { useDispatch } from 'react-redux';
import { signInSagaActionCreator } from '../redux/modules/auth';
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
  //       user_password,
  //     },
  //   });
  //   console.log('result', res);
  // return res.data; //  token
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
