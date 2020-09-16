import React from 'react';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';

//containers
import Header from '../components/header/Header';
import ProfileContainer from '../containers/ProfileContainer';

function Profile() {
  useAuth();

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
