import React from 'react';

// styles
import StyledMain from '../styles/StyledMain';
import useWindowWidth from '../hooks/useWindowWidth';

// components
import Header from '../components/header/Header';
import MainContainer from '../containers/MainContainer';

function Home() {
  const width = useWindowWidth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <MainContainer />
      </StyledMain>
    </>
  );
}

export default Home;
