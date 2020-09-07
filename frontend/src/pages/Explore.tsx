import React from 'react';
import Header from '../containers/Header';
import StyledMain from '../styles/StyledMain';

function Explore() {
  return (
    <>
      <Header />
      <StyledMain>Explore</StyledMain>
    </>
  );
}

export default React.memo(Explore);
