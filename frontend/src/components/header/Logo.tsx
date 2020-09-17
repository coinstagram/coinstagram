import React from 'react';
import { Link } from 'react-router-dom';

// styles
import { StyledH1 } from './LogoStyle';

function Logo() {
  return (
    <>
      <Link to="/">
        <StyledH1>coInstagram</StyledH1>
      </Link>
    </>
  );
}

export default Logo;
