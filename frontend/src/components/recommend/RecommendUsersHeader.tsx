import React from 'react';
import styled from 'styled-components';

// components
import RecommendUsersInfo from './RecommendUsersInfo';

const StyledDiv = styled.div`
  margin: 20px 0;
`;

function RecommendUsersHeader() {
  return (
    <StyledDiv>
      <RecommendUsersInfo size={56} />
    </StyledDiv>
  );
}

export default RecommendUsersHeader;
