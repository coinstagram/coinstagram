import React from 'react';

// styles
import StyledMain from '../components/common/StyledMain';

// components
import Header from '../components/header/Header';
import RandomPostsContainer from '../containers/RandomPostsContainer';

function Explore() {
  return (
    <>
      <Header />
      <StyledMain>
        <RandomPostsContainer />
      </StyledMain>
    </>
  );
}

export default React.memo(Explore);
