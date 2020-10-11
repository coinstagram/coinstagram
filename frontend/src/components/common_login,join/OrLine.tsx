import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  color: #828282;
  margin-bottom: 10px;
  .orText {
    flex-grow: 0;
    padding: 0 10px;
    white-space: nowrap;
  }
  .line {
    flex-grow: 1;
    height: 1px;
    width: 150px;
    position: relative;
    top: 0.7em;
    background-color: #dbdbdb;
  }
`;
export default function OrLine() {
  return (
    <StyledDiv>
      <div className="line"></div>
      <div className="orText">또는</div>
      <div className="line"></div>
    </StyledDiv>
  );
}
