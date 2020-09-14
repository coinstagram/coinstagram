import React from 'react';
import StyledMain from '../components/common/StyledMain';

//containers
import Header from '../components/header/Header';
import ProfileMain from '../containers/ProfileMain';

function Profile() {
  return (
    <>
      <Header />
      <StyledMain>
        <ProfileMain />
      </StyledMain>
    </>
  );
}

export default React.memo(Profile);
