import React from 'react';
import styled from 'styled-components';

export default function JoinButton() {
  const StyledButton = styled.button`
    display: block;
    background: #b2dffc;
    color: white;
    font-weight: bold;
    text-align: center;
    width: 100%;
    height: 30px;
    border-radius: 3px;
  `;

  const Policy = styled.small`
    color: #828282;
    padding: 20px 10px 10px;
    display: block;
    text-align: center;
  `;
  return (
    <>
      <StyledButton type="submit">가입</StyledButton>
      <Policy>
        가입하면 Instagram의 <b>약관, 데이터 정책</b> 및 <b>쿠키 정책</b>에
        동의하게 됩니다.
      </Policy>
    </>
  );
}
