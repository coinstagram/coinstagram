import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { login } from '../lib/api/users';

const StyledH1 = styled.h1`
  font-size: 30px;
  font-weight: normal;
  color: rgb(50, 50, 50);

  &:active {
    color: rgb(120, 120, 120);
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

export default Logo;
