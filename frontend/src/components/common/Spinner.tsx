import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

// styles
import { StyledDiv } from './SpinnerStyle';

interface SpinnerProps {
  isRecommend?: boolean;
}

function Spinner({ isRecommend }: SpinnerProps) {
  return (
    <StyledDiv isRecommend={isRecommend}>
      <FadeLoader color={'grey'} loading={true} />
    </StyledDiv>
  );
}

Spinner.defaultProps = {
  header: false,
};

export default Spinner;
