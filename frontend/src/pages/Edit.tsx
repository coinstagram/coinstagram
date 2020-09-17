import React from 'react';
import Header from '../components/header/Header';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';

function Edit() {
  useAuth();

  return (
    <>
      <Header />
      <StyledMain>Edit</StyledMain>
    </>
  );
}

export default React.memo(Edit);
