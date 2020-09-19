import React from 'react';
import useAuth from '../hooks/useAuth';

// styles
import StyledMain from '../components/common/StyledMain';
import useWindowWidth from '../hooks/useWindowWidth';

// components
import Header from '../components/header/Header';
import HomeMain from '../components/HomeMain';

function Home() {
  useAuth();
  const width = useWindowWidth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <HomeMain />
      </StyledMain>
    </>
  );
}

export default React.memo(Home);
