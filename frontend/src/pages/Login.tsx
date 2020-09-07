import React from 'react';
import styled from 'styled-components';

import JoinAppDownload from '../components/Join/JoinAppDownload';

export default function Login() {
  const StyledDiv = styled.div`
    width: 350px;
    margin: 0 auto;
  `;
  const LoginWrapper = styled.div`
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
      <LoginWrapper>
        <JoinAppDownload />
      </LoginWrapper>
    </StyledDiv>
  );
}
