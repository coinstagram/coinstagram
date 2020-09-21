import React from 'react';
import useAuth from '../hooks/useAuth';
import useWindowWidth from '../hooks/useWindowWidth';

// styles
import StyledMain from '../components/common/StyledMain';

// components
import Header from '../components/header/Header';
import RandomPostsContainer from '../containers/RandomPostsContainer';

function Explore() {
  const width = useWindowWidth();
  useAuth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <RandomPostsContainer />
      </StyledMain>
    </>
  );
}

export default React.memo(Explore);
