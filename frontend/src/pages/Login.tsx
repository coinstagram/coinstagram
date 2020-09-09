import React from 'react';
// import styled from 'styled-components';

import JoinAppDownload from '../components/Join/JoinAppDownload';
import JoinAskLogin from '../components/Join/JoinAskLogin';
import LoginPhoneImage from '../components/login/LoginPhoneImage';
import JoinLoginButton from '../components/Join/JoinLoginButton';
import { MainLogo } from '../components/Join/JoinHeader.style';
import InputUserId from '../components/Join/InputUserId';
import InputPassword from '../components/Join/InputPassword';
import { StyledDiv, LoginWrapper, StyledLogin } from './Login.style';

// const StyledDiv = styled.div`
//   width: 935px;
//   height: 618px;
//   margin: 50px auto;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const LoginWrapper = styled.div`
//   width: 350px;
//   height: 606px;
// `;
// const StyledLogin = styled.div`
//   height: 350px;
//   background: #ffffff;
//   border: 1px solid #dbdbdb;
//   margin: 50px 0 10px 0;
//   padding: 0 40px;
//   box-sizing: border-box;
// `;

export default function Login() {
  return (
    <StyledDiv>
      <LoginPhoneImage />
      <LoginWrapper>
        <StyledLogin>
          <MainLogo style={{ marginBottom: '40px' }}>coInstagram</MainLogo>
          <InputUserId />
          <InputPassword style={{ marginBottom: '20px' }} />
          <JoinLoginButton content="로그인"></JoinLoginButton>
        </StyledLogin>
        <JoinAskLogin askContent="계정이 없으신가요?" content="가입하기" />
        <JoinAppDownload />
      </LoginWrapper>
    </StyledDiv>
  );
}
