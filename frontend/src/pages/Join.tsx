import React from 'react';
import styled from 'styled-components';

import JoinInputBox from '../components/Join/JoinInputBox';
import JoinHeader from '../components/Join/JoinHeader';
import JoinAppDownload from '../components/Join/JoinAppDownload';
import JoinAskLogin from '../components/Join/JoinAskLogin';
import JoinLoginButton from '../components/Join/JoinLoginButton';
import JoinPolicy from '../components/Join/JoinPolicy';

function Join() {
  const StyledDiv = styled.div`
    width: 350px;
    margin: 0 auto;
  `;
  const StyledJoinWrapper = styled.div`
    width: 100%;
    height: 542px;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    margin: 30px 0 10px 0;
    padding: 0 40px;
    box-sizing: border-box;
  `;

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
