import React from 'react';
import styled from 'styled-components';
import useWindowWidth from '../hooks/useWindowWidth';

const StyledSection = styled.section`
  box-sizing: border-box;
  position: fixed;
  width: 293px; /* max-width로 수정 필요 */
  border: 1px solid rgb(219, 219, 219);
`;

function RecommendUsers() {
  const width = useWindowWidth();

  if (width < 1000) return null;

  return <StyledSection>RecommendUsers</StyledSection>;
}

export default RecommendUsers;
