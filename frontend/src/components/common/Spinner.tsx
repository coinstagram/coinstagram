import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

// styles
import { StyledDiv } from './SpinnerStyle';

interface SpinnerProps {
  isheader?: boolean;
}

function Spinner({ isheader }: SpinnerProps) {
  return (
    <StyledDiv isheader={isheader}>
      <FadeLoader color={'grey'} loading={true} />
    </StyledDiv>
  );
}

Spinner.defaultProps = {
  header: false,
};

export default Spinner;
