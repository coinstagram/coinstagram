import React from 'react';
import styled from 'styled-components';

export default function JoinAskLogin() {
  const StyledAskLogin = styled.div`
    height: 70px;
    background: #ffffff;
    border: 1px solid #dbdbdb;
    text-align: center;
    padding: 10px 0;
    margin: 0 0 10px;
    box-sizing: border-box;

    .login {
      color: #0095f6;
    }
  `;
  return (
    <StyledAskLogin>
      {/* 로그인 페이지 라우팅 구현 필요 */}
      <p>
        계정이 있으신가요? <b className="login">로그인</b>
      </p>
    </StyledAskLogin>
  );
}
