import React from 'react';
import Header from '../components/header/Header';
import useWindowWidth from '../hooks/useWindowWidth';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';

// components
import UserPostsContainer from '../containers/UserPostsContainer';

function Post() {
  const width = useWindowWidth();
  useAuth();

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
