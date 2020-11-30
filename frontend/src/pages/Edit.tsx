import React from 'react';
import Header from '../components/header/Header';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';

// components
import EditContainer from '../containers/EditContainer';

function Edit() {
  useAuth();

  return (
    <>
      <Header />
      <StyledMain>
        <EditContainer />
      </StyledMain>
    </>
  );
}

export default React.memo(Edit);
