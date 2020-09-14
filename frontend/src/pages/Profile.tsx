import React from 'react';
import StyledMain from '../components/common/StyledMain';

//containers
import Header from '../components/header/Header';
import ProfileContainer from '../containers/ProfileContainer';

function Profile() {
  return (
    <>
      <Header />
      <StyledMain>
        <ProfileContainer />
      </StyledMain>
    </>
  );
}

export default React.memo(Profile);
