import React from 'react';

import JoinInputBox from '../components/Join/JoinInputBox';
import JoinHeader from '../components/Join/JoinHeader';
import JoinAppDownload from '../components/Join/JoinAppDownload';
import JoinAskLogin from '../components/Join/JoinAskLogin';
import JoinLoginButton from '../components/Join/JoinLoginButton';
import JoinPolicy from '../components/Join/JoinPolicy';
import { StyledDiv, StyledJoinWrapper } from '../components/Join/JoinStyle';

function Join() {
  return (
    <StyledDiv>
      <StyledJoinWrapper>
        <JoinHeader />
        <JoinInputBox />
        <JoinLoginButton content="가입" />
        <JoinPolicy />
      </StyledJoinWrapper>
      <JoinAskLogin askContent="계정이 있으신가요?" content="로그인" />
      <JoinAppDownload />
    </StyledDiv>
  );
}

export default React.memo(Join);
