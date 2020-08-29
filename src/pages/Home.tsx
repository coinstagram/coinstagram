import React from 'react';
import styled, { css } from 'styled-components';
import useWindowWidth from '../hooks/useWindowWidth';

//components
import Header from '../components/Header';
import Feed from '../components/Feed';

export const StyledMain = styled.main`
  max-width: 975px;
  margin: 0 auto;
  padding: 84px 20px 0;

  ${(props: any) =>
    props.width < 1000 &&
    css`
      max-width: 600px;
    `}
`;

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
