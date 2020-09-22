import React from 'react';
import { Link } from 'react-router-dom';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledH1 } from './LogoStyle';

function Logo() {
  const width = useWindowWidth();
  return (
    <>
      <Link to="/">
        <StyledH1 width={width}>coInstagram</StyledH1>
      </Link>
    </>
  );
}

export default Logo;
