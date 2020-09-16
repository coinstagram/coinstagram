import React from 'react';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';

// components
import Header from '../components/header/Header';
import RandomPostsContainer from '../containers/RandomPostsContainer';

function Explore() {
  useAuth();

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
