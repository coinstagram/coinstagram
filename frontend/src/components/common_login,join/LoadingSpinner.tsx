import React from 'react';
import Spinner from '../common/Spinner';
import styled from 'styled-components';

const LoadingSpinnerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 55%;
  /* margin: 10px 0; */
`;

export default function LoadingSpinner() {
  return (
    <LoadingSpinnerWrapper>
      <Spinner />
    </LoadingSpinnerWrapper>
  );
}
