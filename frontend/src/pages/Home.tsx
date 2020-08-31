import React from 'react';
import useWindowWidth from '../hooks/useWindowWidth';

// styles
import StyledMain from '../styles/StyledMain';

// components
import Header from '../components/Header';
import Feed from '../containers/Feed';

function Home() {
  const width = useWindowWidth();

  return (
    <>
      <Header />
      <StyledMain width={width}>
        <Feed />
      </StyledMain>
    </>
  );
}

export default Home;
