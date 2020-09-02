import React from 'react';
import styled from 'styled-components';

import JoinInputBox from '../components/Join/JoinInputBox';
import JoinHeader from '../components/Join/JoinHeader';
import JoinAppDownload from '../components/Join/JoinAppDownload';
import JoinAskLogin from '../components/Join/JoinAskLogin';
import JoinButton from '../components/Join/JoinButton';

function Join() {
  const StyledDiv = styled.div`
    width: 350px;
    margin: 0 auto;
  `;
  const JoinWrapper = styled.div`
    /* test */
    width: 100%;
    /* height: 542px; */
    height: 540px;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    margin: 30px 0 10px 0;
    padding: 0 40px;
    box-sizing: border-box;
  `;
  return (
    <StyledDiv>
      <JoinWrapper>
        <JoinHeader />
        <JoinInputBox />
        <JoinButton />
      </JoinWrapper>
      <JoinAskLogin />
      <JoinAppDownload />
    </StyledDiv>
  );
}

export default Join;
