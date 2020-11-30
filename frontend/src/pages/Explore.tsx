import React from 'react';
import useAuth from '../hooks/useAuth';
import useWindowWidth from '../hooks/useWindowWidth';
import { useLocation } from 'react-router-dom';

// styles
import StyledMain from '../components/common/StyledMain';

// components
import Header from '../components/header/Header';
import RandomPostsContainer from '../containers/RandomPostsContainer';
import TaggedPostsContainer from '../containers/TaggedPostsContainer';

function Explore() {
  const width = useWindowWidth();
  const route = useLocation().pathname.split('/')[2];
  useAuth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        {route === undefined && <RandomPostsContainer />}
        {route === 'tags' && <TaggedPostsContainer />}
      </StyledMain>
    </>
  );
}

export default React.memo(Explore);
