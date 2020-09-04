import React from 'react';
import styled from 'styled-components';
import useWindowWidth from '../../hooks/useWindowWidth';

// components
import RecommendUsersHeader from './RecommendUsersHeader';
import RecommendUsersBody from './RecommendUsersBody';

const StyledSection = styled.section`
  box-sizing: border-box;
  position: fixed;
  width: 313px;
`;

function RecommendUsers() {
  const width = useWindowWidth();

  if (width < 1000) return null;

  return (
    <StyledSection>
      <h3 className="a11y-hidden">추천 계정</h3>
      <RecommendUsersHeader />
      <RecommendUsersBody />
    </StyledSection>
  );
}

export default RecommendUsers;
