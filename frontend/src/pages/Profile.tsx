import React from 'react';
import useAuth from '../hooks/useAuth';
import useWindowWidth from '../hooks/useWindowWidth';

// styles
import StyledMain from '../components/common/StyledMain';

//containers
import Header from '../components/header/Header';
import ProfileContainer from '../containers/ProfileContainer';

function Profile() {
  const width = useWindowWidth();
  useAuth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <ProfileContainer />
      </StyledMain>
    </>
  );
}

export default React.memo(Profile);
