import React from 'react';
import styled, { css } from 'styled-components';

const Policy = styled.small`
  color: #828282;
  /* padding: 20px 10px 10px; */
  padding: 10px 10px;
  display: block;
  text-align: center;
  ${props =>
    props.width <= 750 &&
    css`
      margin-top: 10px;
    `}
`;
interface JoinPolicyProps {
  width?: number;
}
export default function JoinPolicy({ width }: JoinPolicyProps) {
  return (
    <>
      <Policy width={width}>
        가입하면 Instagram의 <b>약관, 데이터 정책</b> 및 <b>쿠키 정책</b>에 동의하게 됩니다.
      </Policy>
    </>
  );
}
