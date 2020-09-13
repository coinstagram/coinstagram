import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

// styles
import { StyledDiv } from './SpinnerStyle';

function Spinner() {
  return (
    <StyledDiv>
      <FadeLoader color={'grey'} loading={true} />
    </StyledDiv>
  );
}

Spinner.defaultProps = {
  header: false,
};

export default Spinner;
