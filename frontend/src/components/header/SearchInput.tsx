import React from 'react';
import useWindowWidth from '../../hooks/useWindowWidth';

// styles
import { StyledButton } from './SearchInputStyle';

// icons
// import { CgClose } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';

function SearchInput() {
  const width = useWindowWidth();

  if (width < 850) return null;

  return (
    <StyledButton>
      <span className="search">
        <FiSearch />
      </span>
      <input placeholder="검색" />
      {/* <span className="reset">
        <CgClose />
      </span> */}
    </StyledButton>
  );
}

export default SearchInput;
