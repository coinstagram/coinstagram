import React from 'react';
import styled from 'styled-components';

import { MainLogo } from '../components/Join/JoinHeaderStyle';
import InputUserId from '../components/common_login,join/InputUserId';
import InputPassword from '../components/common_login,join/InputPassword';
import { StyledLogin } from '../components/login/LoginStyle';
import JoinLoginButton from '../components/Join/JoinLoginButton';

import { useDispatch, useSelector } from 'react-redux';
import { AuthState } from '../type';
import { signinRequestSaga, signinStart } from '../redux/modules/auth';

const StyledForm = styled.form``;

function LoginContainer() {
  const dispatch = useDispatch();
  const { loading, token, error, authData } = useSelector(
    (state: AuthState) => state,
  );
  const { user_id, user_password } = authData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (userPassword !== userPasswordCheck) { //미리 password 의 일치여부를 파악한다.
    //     return setPasswordCheckError(true); }
    // dispatch(signinRequestSaga(authData));
    dispatch(signinStart());
  };
  return (
    <StyledLogin>
      <MainLogo style={{ marginBottom: '40px' }}>coInstagram</MainLogo>
      <StyledForm onSubmit={handleSubmit}>
        <InputUserId />
        <InputPassword style={{ marginBottom: '20px' }} />
        <JoinLoginButton content="로그인" />
      </StyledForm>
    </StyledLogin>
  );
}
export default React.memo(LoginContainer);
