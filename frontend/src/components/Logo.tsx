import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledH1 = styled.h1`
  font-size: 30px;
  font-weight: normal;
  color: rgb(50, 50, 50);

  &:active {
    color: rgb(120, 120, 120);
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
