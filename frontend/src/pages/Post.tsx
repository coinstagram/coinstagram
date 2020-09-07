import React from 'react';
import Header from '../containers/Header';
import StyledMain from '../styles/StyledMain';

function Post() {
  return (
    <>
      <Header />
      <StyledMain>Post</StyledMain>
    </>
  );
}

export default React.memo(Post);
