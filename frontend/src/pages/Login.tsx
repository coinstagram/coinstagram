import React from 'react';
import JoinAppDownload from '../components/Join/JoinAppDownload';
import JoinAskLogin from '../components/Join/JoinAskLogin';
import LoginPhoneImage from '../components/login/LoginPhoneImage';
import LoginContainer from '../containers/LoginContainer';
import useAuth from '../hooks/useAuth';

import { StyledDiv, LoginWrapper } from '../components/login/LoginStyle';
import { Link } from 'react-router-dom';

function Login() {
  // useAuth();

  return (
    <StyledDiv>
      <LoginPhoneImage />
      <LoginWrapper>
        <LoginContainer />
        <Link to={'/join'}>
          <JoinAskLogin askContent="계정이 없으신가요?" content="가입하기" />
        </Link>
        <JoinAppDownload />
      </LoginWrapper>
    </StyledDiv>
  );
}
export default React.memo(Login);
