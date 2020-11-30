import React from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledHeader } from './HeaderStyle';

// components
import Logo from './Logo';
import NavigationContainer from '../../containers/NavigationContainer';
import SearchInput from './SearchInput';

function Header() {
  const width = useWindowWidth();
  return (
    <StyledHeader width={width}>
      <div className="container">
        <Logo />
        <SearchInput />
        <NavigationContainer />
      </div>
    </StyledHeader>
  );
}

export default React.memo(Header);
