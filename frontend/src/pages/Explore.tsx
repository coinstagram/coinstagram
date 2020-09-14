import React from 'react';
import Header from '../components/header/Header';
import StyledMain from '../components/common/StyledMain';

function Explore() {
  return (
    <>
      <Header />
      <StyledMain>Explore</StyledMain>
    </>
  );
}

export default React.memo(Explore);
