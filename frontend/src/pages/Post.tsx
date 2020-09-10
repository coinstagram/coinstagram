import React from 'react';
import Header from '../components/header/Header';
import StyledMain from '../components/common/StyledMain';

// components
import UserPostsContainer from '../containers/UserPostsContainer';

function Post() {
  return (
    <>
      <Header />
      <StyledMain>
        <UserPostsContainer />
      </StyledMain>
    </>
  );
}

export default React.memo(Post);
