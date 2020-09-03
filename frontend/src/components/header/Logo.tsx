import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { login } from '../../lib/api/users';

export const StyledH1 = styled.h1`
  font-size: 30px;
  font-weight: bold;

  &:active {
    color: rgb(142, 142, 142);
  }
`;

const a = async () => {
  console.log(await (await login()).data);
};

function Logo() {
  return (
    <>
      <button onClick={a}>테스트 버튼 입니다.</button>
      <Link to="/">
        <StyledH1>coInstagram</StyledH1>
      </Link>
    </>
  );
}
declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    width?: number;
    count?: number;
    clicked?: boolean;
    size?: number;
    isAnother?: boolean;
  }
}

export default Logo;
