import React from 'react';
import JoinAppDownload from '../components/Join/JoinAppDownload';
import JoinAskLogin from '../components/common_login,join/JoinAskLogin';
import LoginPhoneImage from '../components/login/LoginPhoneImage';
import LoginContainer from '../containers/LoginContainer';

import { StyledDiv, LoginWrapper } from '../components/login/LoginStyle';
import { Link } from 'react-router-dom';
import useWindowWidth from '../hooks/useWindowWidth';

function Login() {
  const width = useWindowWidth();
  return (
    <StyledDiv width={width}>
      <LoginPhoneImage />
      <LoginWrapper width={width}>
        <LoginContainer />
        <Link to="/join">
          <JoinAskLogin askContent="계정이 없으신가요?" content="가입하기" />
        </Link>
        {width > 750 && <JoinAppDownload />}
      </LoginWrapper>
    </StyledDiv>
  );
}
export default React.memo(Login);
