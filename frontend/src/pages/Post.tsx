import React from 'react';
import Header from '../components/header/Header';
import StyledMain from '../components/common/StyledMain';

function Post() {
  return (
    <>
      <Header />
      <StyledMain>Post</StyledMain>
    </>
  );
}

export default React.memo(Post);
