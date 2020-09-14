import React from 'react';
import Header from '../components/header/Header';
import StyledMain from '../components/common/StyledMain';
import useWindowWidth from '../hooks/useWindowWidth';

// components
import UserPostsContainer from '../containers/UserPostsContainer';

function Post() {
  const width = useWindowWidth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <UserPostsContainer />
      </StyledMain>
    </>
  );
}

export default React.memo(Post);
