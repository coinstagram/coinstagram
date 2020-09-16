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
const idRegExp = /^[a-zA-Z0-9]{4,12}$/;

function LoginContainer() {
  const [user_password, setPassword] = useState('');
  const [user_id, setUserId] = useState('');

  const onInputPassword = (text: string): void => {
    setPassword(text);
  };
  const onInputUserId = (text: string): void => {
    setUserId(text);
  };

  const idCheck = idRegExp.test(user_id);
  const passwordCheck = user_password.length >= 6;

  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (idCheck && passwordCheck)
      dispatch(signInSagaActionCreator(user_id, user_password));
  };

  return (
    <>
      <StyledLogin>
        <MainLogo style={{ marginBottom: '40px' }}>coInstagram</MainLogo>
        <StyledForm onSubmit={handleSubmit}>
          <InputUserId
            userId={user_id}
            onInputUserId={onInputUserId}
            toggleIcon={idCheck}
          />
          <InputPassword
            userPassword={user_password}
            onInputPassword={onInputPassword}
            toggleIcon={passwordCheck}
            style={{ marginBottom: '20px' }}
          />
          <JoinLoginButton
            content="로그인"
            disabled={!idCheck && !passwordCheck}
            className={['button', idCheck && passwordCheck && 'active'].join(
              ' ',
            )}
          />
        </StyledForm>
      </StyledLogin>
    </>
  );
}
export default React.memo(LoginContainer);
