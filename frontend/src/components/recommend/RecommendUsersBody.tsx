import React from 'react';
import styled from 'styled-components';

// components
import RecommendUsersInfo from './RecommendUsersInfo';

const StyledDiv = styled.div`
  p {
    color: rgb(142, 142, 142);
    font-weight: bold;
  }

  div + div {
    margin-top: 10px;
  }
`;

function RecommendUsersBody() {
  return (
    <StyledDiv>
      <p>회원님을 위한 추천</p>
      <RecommendUsersInfo size={42} isAnother={true} />
      <RecommendUsersInfo size={42} isAnother={true} />
      <RecommendUsersInfo size={42} isAnother={true} />
      <RecommendUsersInfo size={42} isAnother={true} />
      <RecommendUsersInfo size={42} isAnother={true} />
    </StyledDiv>
  );
}

export default RecommendUsersBody;
