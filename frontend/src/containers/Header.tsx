import React from 'react';
import styled from 'styled-components';
import RootState from '../type';

// components
import Logo from '../components/header/Logo';
import Navigation from '../components/header/Navigation';
import SearchInput from '../components/header/SearchInput';
import { useSelector } from 'react-redux';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(219, 219, 219);

  .container {
    height: 54px;
    padding: 0 20px;
    margin: 0 auto;
    max-width: 975px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

function Header() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const profile = userInfo !== null ? userInfo.profile : null;

  return (
    <StyledHeader>
      <div className="container">
        <Logo />
        <SearchInput />
        <Navigation imageUrl={profile} />
      </div>
    </StyledHeader>
  );
}

export default React.memo(Header);
