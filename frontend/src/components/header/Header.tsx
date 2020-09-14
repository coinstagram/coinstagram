import React from 'react';

// styles
import { StyledHeader } from './HeaderStyle';

// components
import Logo from './Logo';
import NavigationContainer from '../../containers/NavigationContainer';
import SearchInput from './SearchInput';

function Header() {
  return (
    <StyledHeader>
      <div className="container">
        <Logo />
        <SearchInput />
        <NavigationContainer />
      </div>
    </StyledHeader>
  );
}

export default React.memo(Header);
