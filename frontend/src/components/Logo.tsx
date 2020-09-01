import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledH1 = styled.h1`
  font-size: 30px;
  font-weight: normal;

  &:active {
    color: rgb(142, 142, 142);
  }
`;

function Logo() {
  return (
    <Link to="/">
      <StyledH1>coInstagram</StyledH1>
    </Link>
  );
}

export default Logo;
