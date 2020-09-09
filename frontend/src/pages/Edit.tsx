import React from 'react';
import Header from '../components/header/Header';
import StyledMain from '../components/common/StyledMain';

function Edit() {
  return (
    <>
      <Header />
      <StyledMain>Edit</StyledMain>
    </>
  );
}

export default React.memo(Edit);
