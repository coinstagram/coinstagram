import React from 'react';
// import styled from 'styled-components';

import JoinAppDownload from '../components/Join/JoinAppDownload';
import JoinAskLogin from '../components/Join/JoinAskLogin';
import LoginPhoneImage from '../components/login/LoginPhoneImage';
import JoinLoginButton from '../components/Join/JoinLoginButton';
import { MainLogo } from '../components/Join/JoinHeaderStyle';
import InputUserId from '../components/common_login,join/InputUserId';
import InputPassword from '../components/common_login,join/InputPassword';
import {
  StyledDiv,
  LoginWrapper,
  StyledLogin,
} from '../components/login/LoginStyle';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <StyledDiv>
      <LoginPhoneImage />
      <LoginWrapper>
        <StyledLogin>
          <MainLogo style={{ marginBottom: '40px' }}>coInstagram</MainLogo>
          <InputUserId />
          <InputPassword style={{ marginBottom: '20px' }} />
          <JoinLoginButton content="로그인" />
        </StyledLogin>
        <Link to={'/join'}>
          <JoinAskLogin askContent="계정이 없으신가요?" content="가입하기" />
        </Link>
        <JoinAppDownload />
      </LoginWrapper>
    </StyledDiv>
  );
}
export default React.memo(Login);
