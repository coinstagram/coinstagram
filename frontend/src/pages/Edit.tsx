import React from 'react';
import Header from '../components/header/Header';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';

// components
import EditForm from '../components/Edit/EditForm';

function Edit() {
  useAuth();

  return (
    <>
      <Header />
      <StyledMain>
        <EditForm />
      </StyledMain>
    </>
  );
}

export default React.memo(Edit);
