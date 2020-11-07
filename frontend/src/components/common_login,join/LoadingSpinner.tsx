import React from 'react';
import Spinner from '../common/Spinner';
import styled from 'styled-components';

const LoadingSpinnerWrapper = styled.div`
  position: absolute;
  bottom: 65%;
  right: 30%;
`;

export default function LoadingSpinner() {
  return (
    <LoadingSpinnerWrapper>
      <Spinner />
    </LoadingSpinnerWrapper>
  );
}
