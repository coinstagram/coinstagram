import React from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledH1 } from './LogoStyle';

function Logo() {
  const width = useWindowWidth();
  return (
    <>
      <a href="https://github.com/coinstagram/coinstagram" target="_blank" rel="noopener noreferrer">
        <StyledH1 width={width}>coInstagram</StyledH1>
      </a>
    </>
  );
}

export default Logo;
