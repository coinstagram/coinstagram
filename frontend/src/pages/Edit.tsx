import React from 'react';
import Header from '../components/header/Header';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';

// components
import Working from '../components/Edit/Working';

function Edit() {
  useAuth();

  return (
    <>
      <Header />
      <StyledMain>
        <Working />
      </StyledMain>
    </>
  );
}

export default React.memo(Edit);
