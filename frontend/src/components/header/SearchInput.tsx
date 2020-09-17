import React from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledButton } from './SearchInputStyle';

// icons
import { TiDelete } from 'react-icons/ti';
import { FiSearch } from 'react-icons/fi';

function SearchInput() {
  const width = useWindowWidth();

  if (width < 700) return null;

  return (
    <StyledButton>
      <span className="search">
        <FiSearch />
      </span>
      <input placeholder="검색" />
      <span className="reset">
        <TiDelete />
      </span>
    </StyledButton>
  );
}

export default SearchInput;
